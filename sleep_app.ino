#include <Wire.h>
#include <ArduinoBLE.h>  // Include the BLE library
#include "MAX30105.h"
#include "heartRate.h"
#include <ArduinoJson.h>  // Include the Arduino JSON library

// Create a MAX30105 object
MAX30105 particleSensor;

long lastBeat = 0;  // Time at which the last beat occurred
float beatsPerMinute;  // Variable to store BPM

// BLE Service and Characteristic
BLEService heartRateService("180D");                                          // Heart Rate Service UUID
BLECharacteristic heartRateCharacteristic("2A37", BLERead | BLENotify, 256);  // Heart Rate Measurement Characteristic UUID (256 bytes for JSON)

void setup() {
  Serial.begin(115200);
  Serial.println("Initializing...");

  // Initialize the sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 was not found. Please check wiring/power.");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup();                     // Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A);  // Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0);   // Turn off Green LED

  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
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
      long irValue = particleSensor.getIR();  // Read the IR value from the sensor

      if (checkForBeat(irValue) == true) {
        // We sensed a beat!
        long delta = millis() - lastBeat;
        lastBeat = millis();

        beatsPerMinute = 60 / (delta / 1000.0);  // Calculate BPM

        if (beatsPerMinute < 255 && beatsPerMinute > 20) {
          // Create JSON object
          StaticJsonDocument<256> jsonDoc;
          jsonDoc["BPM"] = beatsPerMinute;

          // Serialize JSON to string
          char jsonBuffer[256];
          serializeJson(jsonDoc, jsonBuffer);

          // Print the JSON string to Serial
          Serial.println(jsonBuffer);

          // Send JSON data over Bluetooth
          heartRateCharacteristic.setValue(jsonBuffer);
        }
      }

      // Poll BLE to check for notifications
      BLE.poll();
    }

    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  } else {
    Serial.println("Waiting for connections...");
  }

  // Process BLE events
  BLE.poll();
}
