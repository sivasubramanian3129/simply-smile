package com.ms.simplysmile; // <--- MAKE SURE THIS MATCHES YOUR FOLDER!

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import androidx.core.app.NotificationCompat;

public class NotificationReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // 1. Get the random message
        String message = intent.getStringExtra("message");
        if (message == null) {
            message = "Time to smile! 😊";
        }

        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        // 2. Open App when clicked
        Intent tapIntent = new Intent(context, MainActivity.class);
        tapIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context, 0, tapIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        // 3. Prepare Premium Assets (Amazon Style)
        // A. The Large Colored Image (Appears on the right)
        Bitmap largeIcon = BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher_round);
        
        // B. The Brand Color (Green Tint for the text/small icon)
        int brandColor = android.graphics.Color.parseColor("#006400"); 

        // 4. Build the Notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "daily_smile_channel")
                .setSmallIcon(R.drawable.ic_stat_smile)     // White Silhouette (Status Bar)
                .setLargeIcon(largeIcon)                      // Full Color Logo (Expanded View)
                .setColor(brandColor)                         // Green Tint
                .setContentTitle("Time to Smile! 😊") 
                .setContentText(message)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(message)) // Full Text
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setContentIntent(pendingIntent)              // Click to Open
                .setAutoCancel(true);

        // 5. Send It!
        int notificationId = (int) System.currentTimeMillis(); 
        notificationManager.notify(notificationId, builder.build());
    }
}