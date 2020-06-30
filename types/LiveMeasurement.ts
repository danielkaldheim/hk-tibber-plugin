export interface LiveMeasurement {
  timestamp?: string; // Timestamp when usage occured
  power?: number; // Consumption at the moment (Watt)
  lastMeterConsumption: number; // Last meter active import register state (kWh)
  accumulatedConsumption?: number; // kWh consumed since midnight
  accumulatedProduction?: number; // net kWh produced since midnight
  accumulatedCost: number; // Accumulated cost since midnight; requires active Tibber power deal
  accumulatedReward: number; // Accumulated reward since midnight; requires active Tibber power deal
  currency: string; // Currency of displayed cost; requires active Tibber power deal
  minPower?: number; // Min consumption since midnight (Watt)
  averagePower?: number; // Average consumption since midnight (Watt)
  maxPower?: number; // Peak consumption since midnight (Watt)
  powerProduction: number; // Net production at the moment (Watt)
  minPowerProduction: number; // Min net production since midnight (Watt)
  maxPowerProduction: number; // Max net production since midnight (Watt)
  lastMeterProduction: number; // Last meter active export register state (kWh)
  powerFactor: number; // Power factor (active power / apparent power)
  voltagePhase1: number; // Voltage on phase 1; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.
  voltagePhase2: number; // Voltage on phase 2; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware. Value is always null for single phase meters.
  voltagePhase3: number; // Voltage on phase 3; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware. Value is always null for single phase meters.
  currentL1: number; // Current on L1; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.
  currentL2: number; // Current on L2; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware. Value is always null for single phase meters.
  currentL3: number; // Current on L3; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware. Value is always null for single phase meters.
  signalStrength: number; // Device signal strength (Pulse - dB; Watty - percent)
}
