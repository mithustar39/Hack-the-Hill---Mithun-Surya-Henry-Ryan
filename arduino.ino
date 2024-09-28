#include <Wire.h>
#include <ArduinoBLE.h>  // Include the BLE library
#include "MAX30105.h"
#include "heartRate.h"
#include <ArduinoJson.h>  // Include the Arduino JSON library

// Create a MAX30105 object
MAX30105 particleSensor;

const byte RATE_SIZE = 4;  // Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE];     // Array of heart rates
byte rateSpot = 0;
long lastBeat = 0;  // Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;

// BLE Service and Characteristic
BLEService heartRateService("180D");                                          // Heart Rate Service UUID
BLECharacteristic heartRateCharacteristic("2A37", BLERead | BLENotify, 256);  // Heart Rate Measurement Characteristic UUID (256 bytes for JSON)

void setup() {
  Serial.begin(115200);
  Serial.println("Initializing...");

  // Initialize the sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 was not found. Please check wiring/power.");
    while (1)
      ;
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup();                     // Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A);  // Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0);   // Turn off Green LED

  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1)
      ;
  }

  // Set the local name and start advertising
  BLE.setLocalName("HeartRateSensor");
  BLE.setAdvertisedService(heartRateService);

  // Add the heart rate characteristic to the service
  heartRateService.addCharacteristic(heartRateCharacteristic);

  // Add the service to BLE
  BLE.addService(heartRateService);

  // Start advertising
  BLE.advertise();

  Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  // Check for new BLE connections or events
  BLEDevice central = BLE.central();

  if (central) {
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    while (central.connected()) {
      long irValue = particleSensor.getIR();

      if (checkForBeat(irValue) == true) {
        // We sensed a beat!
        long delta = millis() - lastBeat;
        lastBeat = millis();

        beatsPerMinute = 60 / (delta / 1000.0);

        if (beatsPerMinute < 255 && beatsPerMinute > 20) {
          rates[rateSpot++] = (byte)beatsPerMinute;  // Store this reading in the array
          rateSpot %= RATE_SIZE;                     // Wrap variable

          // Take average of readings
          beatAvg = 0;
          for (byte x = 0; x < RATE_SIZE; x++) {
            beatAvg += rates[x];
          }
          beatAvg /= RATE_SIZE;

          // Create JSON object
          StaticJsonDocument<256> jsonDoc;  // Adjust size as needed
          jsonDoc["BPM"] = beatsPerMinute;
          jsonDoc["AvgBPM"] = beatAvg;

          // Serialize JSON to string
          char jsonBuffer[256];
          serializeJson(jsonDoc, jsonBuffer);

          // Send JSON data over Bluetooth
          heartRateCharacteristic.setValue(jsonBuffer);
        }
      }

      // Print heart rate data to the Serial Monitor
      Serial.print(", BPM=");
      Serial.print(beatsPerMinute);
      Serial.print(", Avg BPM=");
      Serial.print(beatAvg);

      if (irValue < 50000) {
        Serial.print(" No finger?");
      }

      Serial.println();
      
      delay(1000);
      
      // Poll BLE to check for notifications
      BLE.poll();
    }

    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }

  // Process BLE events
  BLE.poll();
}
