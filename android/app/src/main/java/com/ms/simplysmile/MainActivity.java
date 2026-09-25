package com.ms.simplysmile; // <--- MAKE SURE THIS MATCHES YOUR FOLDER!

import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import java.util.Calendar;
import java.util.Random;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import android.app.AlertDialog; // For the pop-up
import android.content.DialogInterface;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;

public class MainActivity extends BridgeActivity {

    // 🌟 THE RANDOM QUOTES
    String[] smileQuotes = {
        "Hey! When was the last time you truly admired your own smile? 😊",
        "Your smile is the best makeup... Want to wear it for 1 minute? 💄✨",
        "Challenge Accepted? Can you hold a smile for 60 seconds right now? ⏱️😁",
        "Mother Earth is waiting for her favorite view... Your happy face! 🌍🌸",
        "Feeling tired? A 1-minute smile works better than coffee! ☕⚡",
        "Someone needs a smile today... Why not start with yourself? 💖",
        "Don't let the world steal your joy. Take it back with a smile! 🛡️😄",
        "Mirror, mirror on the wall... Who has the brightest smile of all? 🪞✨",
        "Just 1 minute. That’s all it takes to reset your mood. Ready? 🧘‍♂️",
        "Your smile heals you first, then the world. Time to heal? 🩹❤️",
        "Have you ever watched your own smile for a full minute? Give it a try! 👏😍",
        "Who wishes to see your smiling face? YOU should! Come see it shine! 🌟👀",
        "Everyone around you admires your smile... Why don't you? Come admire it now! 🥰",
        "Your Inner Self is a wonder, broadcasting live through your smile. witness here! 📡✨",
        "Mother Earth wants to hug you with a message, but first, she needs a smile! 🫂🌿",
        "Pause. Breathe. Smile. You are exactly where you need to be. 🛑🌬️😊",
        "Your smile is the bridge between your soul and the world. Walk across it today. 🌉💫",
        "Warning: Your smile is highly contagious! Want to start an outbreak? ⚠️😆",
        "Think of your favorite memory... now hold that feeling for 60 seconds. 💭🥰",
        "You don’t need a reason to smile. Sometimes, the smile IS the reason! 🎈",
        "Give your face a workout—flex those 'happy muscles' for one full minute! 💪😁",
        "Mother Earth speaks in colors; you speak in smiles. Let’s have a conversation. 🌈🗣️",
        "Don't let the world change your smile. Let your smile change the world. 🌍💫",
        "Feeling heavy? A 60-second smile is the best medicine. Start your challenge now! 💊⏳",
        "Your smile today is a prayer! Let’s think of our global family together. 🙏🌏",
        "Happiness is contagious! Share a smile to heal the planet. 🌱✨",
        "Think of one thing that made you happy today. Smile for 60 seconds. 🛌💭",
        "Mommy Earth is watching over you. Hug back with a smile. 🌍❤️",
        "The Universe honored you as 'Miss Inner Beauty' just through your Smile, Smile! 👑🎉",
        "A smile is your armor. Come wear it and win today! 🛡️🏆",
        "Your smile is offering free mind therapy! Come and refresh yourself. 💆‍♀️✨",
        "Your smile holds the solution to what's on your mind. Get it in just a minute! 💡🗝️",
        "Your eyes are tired... Refresh them with the beautiful view of your own smile! 👀✨",
        "The power of your smile can even make your camera smile! witness the miracle dear. 📸😁",
        "A smile adds beauty to you. Come and wear this natural makeup in just one minute! 💄✨",
        "Your happy face muscles are waiting to dance. Let them, Boss! 💃😎",
        "How can your simple smile be as bright as the sun? Dig the secret in just 1 minute! ☀️✨"
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
	// 🎯 0. INITIALIZE ADMOB WITH FAMILY-SAFE (G) CONTENT FILTER
        RequestConfiguration requestConfiguration = new RequestConfiguration.Builder()
            .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
            .build();
        MobileAds.setRequestConfiguration(requestConfiguration);
        MobileAds.initialize(this, initializationStatus -> {});

        // 1. Show New Year Greeting
        showNewYearGreeting(); 

        // 2. Setup Notifications Channel
        createNotificationChannel();

        // 3. 🦁 NEW: ASK FOR PERMISSION (Android 13+)
        if (Build.VERSION.SDK_INT >= 33) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, 101);
            } else {
                // Already granted? Schedule!
                scheduleWeeklyNotifications();
            }
        } else {
            // Old Android? Just schedule!
            scheduleWeeklyNotifications();
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channelId = "daily_smile_channel";
            CharSequence name = "Daily Smile Reminders";
            String description = "Reminders to smile every day";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void scheduleWeeklyNotifications() {
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        
        List<String> quoteDeck = new ArrayList<>(Arrays.asList(smileQuotes));
        Collections.shuffle(quoteDeck); // Randomize

        Calendar calendar = Calendar.getInstance();

        // Schedule for the next 7 days
        for (int i = 0; i < 7; i++) {
            Calendar alarmCal = Calendar.getInstance();
            alarmCal.add(Calendar.DAY_OF_YEAR, i);
            int dayOfYear = alarmCal.get(Calendar.DAY_OF_YEAR);

            String morningQuote = (i * 2 < quoteDeck.size()) ? quoteDeck.get(i * 2) : quoteDeck.get(0);
            String eveningQuote = (i * 2 + 1 < quoteDeck.size()) ? quoteDeck.get(i * 2 + 1) : quoteDeck.get(1);

            // MORNING ALARM (9:00 AM) - Stable ID
            scheduleSingleNotification(alarmManager, alarmCal, 9, 0, morningQuote, 1000 + dayOfYear);

            // EVENING ALARM (6:00 PM) - Stable ID
            scheduleSingleNotification(alarmManager, alarmCal, 18, 0, eveningQuote, 2000 + dayOfYear);
        }
    }

   private void scheduleSingleNotification(AlarmManager alarmManager, Calendar targetDay, int hour, int minute, String message, int uniqueId) {
        try {
            Calendar calendar = (Calendar) targetDay.clone();
            calendar.set(Calendar.HOUR_OF_DAY, hour);
            calendar.set(Calendar.MINUTE, minute);
            calendar.set(Calendar.SECOND, 0);

            // Don't schedule past times for today
            if (calendar.getTimeInMillis() <= System.currentTimeMillis()) {
                return;
            }

            Intent intent = new Intent(this, NotificationReceiver.class);
            intent.putExtra("message", message);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                    this,
                    uniqueId,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            if (alarmManager != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    if (alarmManager.canScheduleExactAlarms()) {
                        alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
                    } else {
                        alarmManager.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
                    }
                } else {
                    alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

 
    // 🌟 NEW YEAR GREETING LOGIC
    private void showNewYearGreeting() {
        Calendar today = Calendar.getInstance();
        int year = today.get(Calendar.YEAR);
        int month = today.get(Calendar.MONTH); 
        int day = today.get(Calendar.DAY_OF_MONTH);

        // LOGIC: Show if today is Dec 31, 2025 OR Jan 1st - Jan 7th, 2026
        boolean isNewYearEve = (year == 2025 && month == Calendar.DECEMBER && day == 31);
        boolean isFirstWeek = (year == 2026 && month == Calendar.JANUARY && day <= 7);

        if (isNewYearEve || isFirstWeek) {
            
            // Note: Keep 'R.style.PinkDialogTheme' if you added it earlier. 
            // If not, just use 'new AlertDialog.Builder(this)'
            new AlertDialog.Builder(this, R.style.PinkDialogTheme)
                .setTitle("Happy New Year 2026! 🎉")
                .setMessage("SimplySMILE wishes you a year filled with joy, nature's blessings, and beautiful smiles! 🌿✨\n\nLet's start the year with a smile.")
                
                // 👇 UPDATED BUTTON: Clear text + Hand Icon
                .setPositiveButton("TAP TO START THE YEAR WITH SMILE👆", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setCancelable(false) 
                .show();
        }
    }  

// 🦁 FIX: LISTEN FOR PERMISSION RESULT
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults); // Important for Capacitor!

        if (requestCode == 101) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // User said YES! Schedule immediately.
                scheduleWeeklyNotifications();
            }
        }
    }
}