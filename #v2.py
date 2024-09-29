import random
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import json
from statistics import mode

class QNetwork(nn.Module):
    def __init__(self, state_size, action_size):
        super(QNetwork, self).__init__()
        self.fc1 = nn.Linear(state_size, 64)  # Input: heart rate and HRV
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, action_size)  # Output: Q-values for each action

    def forward(self, state):
        x = torch.relu(self.fc1(state))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)  # Q-values for each action (sleep solutions)

# Function to load JSON data from a file
def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            json_data = json.load(file)
        return json_data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Invalid JSON format in file: {file_path}")
        return None

# Function to parse JSON data into a tensor
def parse_json_data(json_entry):
    try:
        heart_rate = json_entry['heart_rate']
        hrv = json_entry['hrv']
        return torch.Tensor([heart_rate, hrv])  # Return as tensor for the RL model
    except KeyError:
        print("Invalid data format in JSON")
        return None

# Define sleep solutions (actions)
sleep_solutions = [
    "Meditation before bed", 
    "No screen time 1 hour before bed",
    "Light stretching before bed",
    "Avoid caffeine after noon",
    "Deep breathing exercises",
    "Progressive muscle relaxation",
    "Establish a consistent bedtime routine",
    "Optimize bedroom environment"
]

# Initialize Q-Network
state_size = 2  # heart rate and HRV
action_size = len(sleep_solutions)
q_network = QNetwork(state_size, action_size)
optimizer = optim.Adam(q_network.parameters(), lr=0.001)
loss_fn = nn.MSELoss()

# Hyperparameters
epsilon = 0.3  # Increased exploration rate
gamma = 0.99   # Discount factor

# Function to choose an action (epsilon-greedy strategy)
def choose_action(state, epsilon):
    if random.random() < epsilon:
        # Explore: Choose a random action
        return random.randint(0, action_size - 1)
    else:
        # Exploit: Choose the action with the highest Q-value
        with torch.no_grad():
            q_values = q_network(state)
            return torch.argmax(q_values).item()

# Function to calculate reward (example: higher HRV and lower heart rate are better)
def calculate_reward(new_sleep_data):
    heart_rate = new_sleep_data['heart_rate']
    hrv = new_sleep_data['hrv']

    # Define reward: High HRV and low heart rate are considered good sleep quality
    if heart_rate < 60 and hrv > 8:
        return 10  # High reward for excellent sleep
    elif 60 <= heart_rate <= 70 and 5 <= hrv <= 8:
        return 5   # Medium reward for average sleep
    else:
        return 1   # Low reward for poor sleep

# Q-learning function
def q_learning(json_entry):
    state = parse_json_data(json_entry)
    if state is None:
        return  # Invalid data, skip this iteration

    # Choose an action (sleep solution)
    action = choose_action(state, epsilon)

    # Simulate randomized new sleep data for demonstration (instead of hard-coding)
    new_json_data = {
        "heart_rate": random.randint(55, 70),  # Random heart rate
        "hrv": random.randint(5, 10)          # Random HRV
    }
    
    new_state = parse_json_data(new_json_data)

    # Calculate reward based on new sleep data
    reward = calculate_reward(new_json_data)

    # Get predicted Q-values for current state-action pair
    current_q_values = q_network(state)
    target_q_values = current_q_values.clone()

    # Get next max Q-value (Q-learning update rule)
    with torch.no_grad():
        next_q_values = q_network(new_state)
        next_max_q_value = torch.max(next_q_values)

    # Update Q-value for the chosen action
    target_q_values[action] = reward + gamma * next_max_q_value

    # Train the Q-network
    loss = loss_fn(current_q_values, target_q_values)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    return sleep_solutions[action]  # Return the recommended solution

# Best solution tracking
def best_solution_tracking(q_solutions, counter, rounds):
    if counter >= rounds:
        # Check if the most frequently suggested solution dominates
        if q_solutions.count(mode(q_solutions)) >= len(q_solutions) // 2:
            print(f"Best solution found: {mode(q_solutions)}")
            return True, mode(q_solutions)
    return False

# Load the sleep data from the JSON file
file_path = "sleep_data.json"
json_data = load_json_file(file_path)

if json_data is not None and "sleep_data" in json_data:
    q_solutions = []
    counter = 0
    rounds = 50  # Increased number of rounds for better exploration

    for entry in json_data["sleep_data"]:
        recommended_solution = q_learning(entry)
        if recommended_solution:
            print(f"Recommended Sleep Solution: {recommended_solution}")
            q_solutions.append(recommended_solution)
            counter += 1

            # Check if the best solution is found
            if best_solution_tracking(q_solutions, counter, rounds):
                break
else:
    print("Failed to load or parse sleep data.")
