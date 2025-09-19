import 'package:flutter/material.dart';

void main() => runApp(GreenovatorsApp());

class GreenovatorsApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TapScreen(),
    );
  }
}

class TapScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Tap & EcoPoints')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Tap your card...'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => print("Mock tap event sent"),
              child: Text("Simulate Tap"),
            )
          ],
        ),
      ),
    );
  }
}
