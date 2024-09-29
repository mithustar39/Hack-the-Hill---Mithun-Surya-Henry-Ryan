import serial
import time
import json
from pymongo import MongoClient
from urllib.parse import quote_plus

# Escape the username and password
username = quote_plus("Henry")
password = quote_plus("Hcai1@ocdsb.ca")

# MongoDB connection setup with escaped credentials
mongo_client = MongoClient(f"mongodb+srv://{username}:{password}@sleeptracker.ioe59.mongodb.net/SleepDB?retryWrites=true&w=majority")
print("Connected to MongoDB")

db = mongo_client['SleepDB']  # Replace with your database name
collection = db['Heart Rate']  # Replace with your collection name

# Configure the serial connection to the Arduino
arduino = serial.Serial(port='COM5', baudrate=115200, timeout=0.1)

# Time counters for sleep stages
awake_time = 0
rem_time = 0
nrem_time = 0

# Variables for heart rate averaging
sum_beats = 0
beat_count = 0

# Function to classify sleep stages based on average BPM
def classify_sleep_stage(avg_bpm):
    if avg_bpm > 70:
        return "Awake"
    elif 60 <= avg_bpm <= 70:
        return "REM Sleep"
    else:
        return "NREM Sleep"

def read_from_arduino():
    """Read a line from the serial port, parse it as JSON, and return the BPM."""
    try:
        serial_data = arduino.readline().decode('utf-8').strip()  # Read and decode data
        if serial_data:  # If any data is received
            print(f"Received JSON: {serial_data}")  # Print raw data for debugging
            
            # Parse the serial data into a JSON object
            try:
                heart_rate_data = json.loads(serial_data)
                bpm = heart_rate_data["BPM"]
                return bpm
            except json.JSONDecodeError:
                print("Error decoding JSON data.")
                return None
    except Exception as e:
        print(f"Error reading from Arduino: {e}")
        return None

# Main loop
start_time = time.time()

while True:
    # Continuously read data from Arduino
    bpm = read_from_arduino()
    if bpm:
        sum_beats += bpm
        beat_count += 1
        
        # Insert BPM data into MongoDB
        heart_rate_data = {"BPM": bpm, "timestamp": time.time()}
        #collection.insert_one(heart_rate_data)
        #print("Data inserted into MongoDB")

    # Check if 30 seconds have passed
    if time.time() - start_time >= 30:
        # Calculate average BPM over 30 seconds
        if beat_count > 0:
            avg_bpm = sum_beats / beat_count
            print(f"Average BPM over 30 seconds: {avg_bpm}")

            # Classify sleep stage based on average BPM
            sleep_stage = classify_sleep_stage(avg_bpm)
            print(f"User is in: {sleep_stage}")

            # Update time spent in each sleep stage
            if sleep_stage == "Awake":
                awake_time += 30
            elif sleep_stage == "REM Sleep":
                rem_time += 30
            else:
                nrem_time += 30

            # Print sleep stage summary so far
            print(f"Time spent Awake: {awake_time} seconds")
            print(f"Time spent in REM: {rem_time} seconds")
            print(f"Time spent in NREM: {nrem_time} seconds")

        # Reset for the next 30-second interval
        sum_beats = 0
        beat_count = 0
        start_time = time.time()

    # Add a small delay to avoid overwhelming the serial port
    time.sleep(0.05)
