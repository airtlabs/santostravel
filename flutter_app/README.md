# Santos Travel - Flutter Mobile App

A beautiful, cross-platform mobile application for Santos Travel built with Flutter, connecting to the existing Next.js backend.

## 🚀 Features

- **Travel Packages**: Browse and search travel packages by category, destination, and price
- **Package Details**: Detailed view with itinerary, inclusions, exclusions, and booking
- **Booking System**: Complete booking flow with form validation
- **Travel Blog**: Read travel stories and tips
- **Responsive Design**: Optimized for all screen sizes
- **Real-time Data**: Connects to your existing Next.js API

## 📱 Screenshots

*(Add screenshots here once the app is running)*

## 🛠 Tech Stack

- **Flutter 3.x**: Cross-platform mobile development
- **Riverpod**: State management
- **Go Router**: Navigation
- **HTTP/Dio**: API communication
- **Cached Network Image**: Image loading and caching
- **Google Fonts**: Typography

## 🏗 Project Structure

```
lib/
├── core/
│   ├── api_config.dart      # API configuration
│   └── theme.dart           # App theme and colors
├── models/
│   ├── travel_package.dart  # Package data model
│   ├── blog_post.dart       # Blog data model
│   └── booking.dart         # Booking data model
├── services/
│   ├── package_service.dart # Package API calls
│   ├── blog_service.dart    # Blog API calls
│   └── booking_service.dart # Booking API calls
├── screens/
│   ├── home_screen.dart     # Home page
│   ├── packages_screen.dart # Package listing
│   ├── package_detail_screen.dart # Package details
│   ├── bookings_screen.dart # User bookings
│   ├── blog_screen.dart     # Blog listing
│   └── profile_screen.dart  # User profile
├── widgets/
│   ├── bottom_nav_bar.dart  # Bottom navigation
│   └── package_card.dart    # Package card widget
└── main.dart                # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (3.0 or higher)
- Android Studio / VS Code
- Android device or emulator

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/saratharavind/Downloads/san/santostravel/flutter_app
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Configure API endpoint**
   
   Edit `lib/core/api_config.dart`:
   
   ```dart
   // For production (your deployed backend)
   static const String baseUrl = 'https://ssantostravel.vercel.app';
   
   // For local development
   // static const String baseUrl = 'http://10.0.2.2:3000'; // Android emulator
   // static const String baseUrl = 'http://YOUR_LOCAL_IP:3000'; // Physical device
   ```

4. **Run the app**
   ```bash
   flutter run
   ```

## 🔧 Configuration

### API Connection

The app connects to your existing Next.js backend. Update the `baseUrl` in `lib/core/api_config.dart`:

- **Production**: Use your Vercel deployment URL
- **Local Development**: 
  - Android Emulator: `http://10.0.2.2:3000`
  - Physical Device: `http://YOUR_LOCAL_IP:3000`

### Backend Endpoints Used

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package details
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/blogs` - Get blog posts
- `GET /api/blogs/:slug` - Get blog post details

## 🎨 Customization

### Theme Colors

Edit `lib/core/theme.dart` to customize the app's appearance:

```dart
static const Color primaryColor = Color(0xFFF59E0B); // Yellow-400
static const Color secondaryColor = Color(0xFF1E293B); // Slate-800
```

### App Icon

Replace the app icon by updating:
- `assets/icons/santos_logo.png`
- Run `flutter pub run flutter_launcher_icons:main`

## 📦 Building

### Android APK

```bash
flutter build apk --release
```

### Android App Bundle (for Play Store)

```bash
flutter build appbundle --release
```

## 🧪 Testing

Run tests:
```bash
flutter test
```

## 📱 Platform Support

- ✅ Android
- ✅ iOS (with additional setup)
- ✅ Web (with flutter web)

## 🔄 API Integration

The app is designed to work seamlessly with your existing Santos Travel backend:

1. **No Backend Changes**: Uses existing API endpoints
2. **Same Database**: Connects to the same Supabase database
3. **Consistent Data**: Same models and data structure
4. **Real-time**: Live data from your website

## 🚀 Deployment

### Android Play Store

1. Build app bundle: `flutter build appbundle --release`
2. Upload to Google Play Console
3. Follow Play Store guidelines

### TestFlight (iOS)

1. Set up iOS certificates
2. Build iOS app: `flutter build ios --release`
3. Upload to App Store Connect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Santos Travel ecosystem.

## 🆘 Support

For support:
- Email: travel@santos.travel
- Phone: 1800 22 7979

---

**Note**: This Flutter app connects to your existing Next.js backend and Supabase database. Make sure your backend is running and accessible from your mobile device.
