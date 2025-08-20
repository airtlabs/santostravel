#!/bin/bash
cd /Users/saratharavind/Downloads/san/santostravel/santos_travel_mobile
echo "Current directory: $(pwd)"
echo "Checking for pubspec.yaml: $(ls -la pubspec.yaml)"
echo "Running Flutter app on emulator..."
flutter run -d emulator-5554
