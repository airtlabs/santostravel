class ApiConfig {
  // Change this to your deployed backend URL or local IP for testing
  static const String baseUrl = 'https://ssantostravel.vercel.app'; // Your Vercel deployment
  // For local development, use: 'http://10.0.2.2:3000' for Android emulator
  // or 'http://YOUR_LOCAL_IP:3000' for physical device
  
  static const String apiVersion = '/api';
  
  // Endpoints
  static const String packages = '$apiVersion/packages';
  static const String bookings = '$apiVersion/bookings';
  static const String blogs = '$apiVersion/blogs';
  static const String health = '$apiVersion/health';
  
  // Request timeout
  static const Duration timeout = Duration(seconds: 30);
  
  // Headers
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}
