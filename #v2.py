#v2
import random
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import json


model =0 
sleep_solutions = ["Meditation before bed", "No screen time 1 hour before bed",
        "Light stretching before bed", "Avoid caffeine after noon",
        "Deep breathing exercises", "Progressive muscle relaxation",
        "Establish a consistent bedtime routine", "Optimize bedroom environment"]

def parse_json_data(json_data):
    try:
        data = json.loads(json_data)
        heart_rate = data['heart_rate']
        hrv = data['hrv']
        return torch.Tensor([heart_rate, hrv])  # Return as tensor for the RL model
    except json.JSONDecodeError:
        print("Invalid JSON format")
        return None
    
def choose_action(state):
    global epsilon
    if np.random.rand() <= epsilon:  # Explore with probability epsilon
        return random.randrange(action_size)  # Choose a random action (exploration)
    
    # Exploit: Choose the action with the highest Q-value (best action for this state)
    q_values = model(torch.FloatTensor(state))  # Get Q-values for the current state
    return torch.argmax(q_values).item()

class SleepEnvironment:
    def __init__(self, sleep_data):
        self.sleep_data = sleep_data
        self.current_state = None

    def reset(self):
        # Reset environment to initial state
        self.current_state = random.choice(self.sleep_data)  # Random initial sleep data
        return self.current_state

    def step(self, action):
        # Apply sleep solution and return new state and reward
        heart_rate = self.current_state['heart_rate']
        hrv = self.current_state['hrv']
        
        # Simulate state transition based on action
        # (in real use, you'd have more complex logic based on sleep improvement)
        if action == 0:  # "Meditation before bed"
            heart_rate -= 2  # Meditation might lower heart rate
            hrv += 1  # Increase HRV
        elif action == 1:  # "No screen time"
            heart_rate -= 1
            hrv += 1
        # Add more actions and corresponding effects on heart rate and HRV
        
        # New state after applying the action
        new_state = {'heart_rate': heart_rate, 'hrv': hrv}
        
        # Calculate reward based on improvement in sleep quality (customize this logic)
        reward = self.calculate_reward(heart_rate, hrv)
        
        # Update current state to new state
        self.current_state = new_state
        return new_state, reward

    def calculate_reward(self, heart_rate, hrv):
        # Custom reward function based on heart rate and HRV
        if heart_rate < 60 and hrv > 8:
            return 10  # High reward for optimal heart rate and HRV
        elif 60 <= heart_rate <= 70 and 5 <= hrv <= 8:
            return 5  # Medium reward
        else:
            return 1  # Low reward


class DQNAgent(nn.Module):
    def __init__(self, state_size, action_size):
        super(DQNAgent, self).__init__()
        self.fc1 = nn.Linear(state_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, action_size)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Initialize parameters
state_size = 2  # Input: heart rate, HRV
action_size = 8  # Number of possible sleep solutions

agent = DQNAgent(state_size, action_size)

# Hyperparameters
gamma = 0.95  # Discount factor for future rewards
epsilon = 1.0  # Exploration rate (initially high to explore more)
epsilon_min = 0.01  # Minimum exploration rate
epsilon_decay = 0.995  # Decay rate for exploration
learning_rate = 0.001

optimizer = optim.Adam(agent.parameters(), lr=learning_rate)
criterion = nn.MSELoss()

# Memory buffer for experience replay
memory = []

def remember(state, action, reward, next_state):
    memory.append((state, action, reward, next_state))

def act(state):
    if np.random.rand() <= epsilon:
        # Explore: choose random action
        return random.randrange(action_size)
    else:
        # Exploit: choose best action based on current Q-values
        state_tensor = torch.Tensor(state)
        q_values = agent(state_tensor)
        return torch.argmax(q_values).item()

def replay(batch_size):
    global epsilon
    if len(memory) < batch_size:
        return
    
    # Sample a batch of experiences from memory
    minibatch = random.sample(memory, batch_size)
    
    for state, action, reward, next_state in minibatch:
        state_tensor = torch.Tensor(state)
        next_state_tensor = torch.Tensor(next_state)
        
        # Compute target Q-value
        target = reward
        if next_state is not None:
            target += gamma * torch.max(agent(next_state_tensor)).item()
        
        # Predicted Q-value
        predicted_q = agent(state_tensor)[action]
        
        # Compute loss and perform backpropagation
        loss = criterion(predicted_q, torch.tensor([target]))
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    
    # Decay exploration rate
    if epsilon > epsilon_min:
        epsilon *= epsilon_decay
        
def train_agent(env, episodes=1000, batch_size=32):
    for e in range(episodes):
        # Reset environment for each episode
        state = env.reset()
        state = np.array([state['heart_rate'], state['hrv']])
        
        for time in range(500):  # Max time steps per episode
            # Choose an action
            action = act(state)
            
            # Take action and observe new state and reward
            next_state, reward = env.step(action)
            next_state = np.array([next_state['heart_rate'], next_state['hrv']])
            
            # Store experience in memory
            remember(state, action, reward, next_state)
            
            # Transition to next state
            state = next_state
            
            # Perform experience replay to train the agent
            replay(batch_size)
        
        # Print progress every 100 episodes
        if (e + 1) % 100 == 0:
            print(f"Episode {e + 1}/{episodes}: Epsilon {epsilon:.2}")

# Example sleep data to initialize the environment
sleep_data = [
    {'heart_rate': 70, 'hrv': 5},  # Example initial states
    {'heart_rate': 65, 'hrv': 7},
    {'heart_rate': 80, 'hrv': 3}
]

# Initialize the environment and train the agent
env = SleepEnvironment(sleep_data)


train_agent(env)

def predict_best_solution(sleep_data):
    state = np.array([sleep_data['heart_rate'], sleep_data['hrv']])
    action = act(state)
    
    # Map action (index) to corresponding sleep solution
    sleep_solutions = [
        "Meditation before bed", "No screen time 1 hour before bed",
        "Light stretching before bed", "Avoid caffeine after noon",
        "Deep breathing exercises", "Progressive muscle relaxation",
        "Establish a consistent bedtime routine", "Optimize bedroom environment"
    ]
    
    recommended_solution = sleep_solutions[action]
    print(f"Recommended Sleep Solution: {recommended_solution}")
    return recommended_solution

