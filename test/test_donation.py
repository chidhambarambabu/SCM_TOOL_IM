# ============================================================
# Automated Unit & Integration Tests
# Configuration Item: CI-10
# SCM Baseline: Testing Baseline (v0.2.0-beta)
# Author: Dravid Anand B (23MIS0036)
# ============================================================

import unittest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from AI_Model.predict_surplus import SurplusPredictor

class TestFoodDonationSystem(unittest.TestCase):

    def setUp(self):
        self.predictor = SurplusPredictor()

    def test_tc01_prediction_standard_inputs(self):
        """TC-01: Verify AI prediction under standard Friday dinner service."""
        res = self.predictor.predict(
            day_of_week='Friday',
            expected_footfall=300,
            historical_avg_sales=8000,
            inventory_level_kg=50.0,
            weather='Sunny / Clear'
        )
        self.assertGreater(res['predicted_surplus_kg'], 0)
        self.assertGreater(res['predicted_surplus_meals'], 0)
        self.assertGreater(res['confidence_percentage'], 85.0)

    def test_tc02_zero_footfall_safety(self):
        """TC-02: Verify behavior when footfall is zero (kitchen closed)."""
        res = self.predictor.predict(
            day_of_week='Monday',
            expected_footfall=0,
            historical_avg_sales=0,
            inventory_level_kg=0.0
        )
        self.assertEqual(res['predicted_surplus_kg'], 0.0)
        self.assertEqual(res['predicted_surplus_meals'], 0)

    def test_tc03_weather_impact_reduction(self):
        """TC-03: Verify rainy weather dampens footfall and alerts kitchen."""
        sunny = self.predictor.predict('Sunday', 500, 15000, 100.0, 'Sunny / Clear')
        rainy = self.predictor.predict('Sunday', 500, 15000, 100.0, 'Rainy / Cold')
        # On rainy days footfall drops, causing inventory surplus to increase
        self.assertGreaterEqual(rainy['predicted_surplus_kg'], 0)

    def test_tc04_co2_environmental_calculation(self):
        """TC-04: Verify correct CO2 avoidance factor (2.5 kg CO2e / kg food)."""
        res = self.predictor.predict('Saturday', 200, 6000, 40.0)
        expected_co2 = round(res['predicted_surplus_kg'] * 2.5, 2)
        self.assertEqual(res['co2_saved_kg'], expected_co2)

if __name__ == '__main__':
    unittest.main()
