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

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;

public class MainActivity extends BridgeActivity {

// 🌟 MULTI-LANGUAGE QUOTE ARRAYS (37 Quotes Fully Translated)

String[] englishQuotes = {
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

String[] germanQuotes = {
    "Hey! Wann hast du dein eigenes Lächeln das letzte Mal bewusst bewundert? 😊",
    "Dein Lächeln ist das beste Make-up... Möchtest du es 1 Minute lang tragen? 💄✨",
    "Herausforderung angenommen? Kannst du jetzt 60 Sekunden lang lächeln? ⏱️😁",
    "Mutter Erde wartet auf ihre Lieblingsaussicht... Dein glückliches Gesicht! 🌍🌸",
    "Müde? Ein 1-minütiges Lächeln wirkt besser als Kaffee! ☕⚡",
    "Jemand braucht heute ein Lächeln... Warum nicht bei dir selbst anfangen? 💖",
    "Lass dir von der Welt nicht die Freude rauben. Hol sie dir mit einem Lächeln zurück! 🛡️️😄",
    "Spieglein, Spieglein an der Wand... Wer hat das strahlendste Lächeln im Land? 🪞✨",
    "Nur 1 Minute. Mehr braucht es nicht, um die Stimmung zu heben. Bereit? 🧘‍♂️",
    "Dein Lächeln heilt zuerst dich, dann die Welt. Zeit zu heilen? 🩹❤️",
    "Hast du dir dein eigenes Lächeln schon mal eine volle Minute lang angesehen? Probier es aus! 👏😍",
    "Wer möchte dein lächelndes Gesicht sehen? DU solltest es! Komm und strahle! 🌟👀",
    "Alle um dich herum bewundern dein Lächeln... Warum du nicht? Bewundere es jetzt! 🥰",
    "Dein inneres Selbst ist ein Wunder, das live über dein Lächeln strahlt. Überzeuge dich selbst! 📡✨",
    "Mutter Erde möchte dich mit einer Botschaft umarmen, aber zuerst braucht sie ein Lächeln! 🫂🌿",
    "Innehalten. Atmen. Lächeln. Du bist genau am richtigen Ort. 🛑🌬️😊",
    "Dein Lächeln ist die Brücke zwischen deiner Seele und der Welt. Geh heute darüber hinweg. 🌉💫",
    "Warnung: Dein Lächeln ist hoch ansteckend! Willst du eine Epidemie starten? ⚠️😆",
    "Denk an deine Lieblingserinnerung... halte dieses Gefühl jetzt 60 Sekunden lang fest. 💭🥰",
    "Du brauchst keinen Grund zum Lächeln. Manchmal IST das Lächeln der Grund! 🎈",
    "Gib deinem Gesicht ein Workout – trainiere diese 'glücklichen Muskeln' eine volle Minute lang! 💪😁",
    "Mutter Erde spricht in Farben; du sprichst in Lächeln. Lass uns ein Gespräch führen. 🌈🗣️",
    "Lass nicht zu, dass die Welt dein Lächeln verändert. Lass dein Lächeln die Welt verändern. 🌍💫",
    "Fühlst du dich schwer? Ein 60-sekündiges Lächeln ist die beste Medizin. Starte deine Challenge! 💊⏳",
    "Dein Lächeln heute ist ein Gebet! Lass uns gemeinsam an unsere globale Familie denken. 🙏🌏",
    "Glück ist ansteckend! Teile ein Lächeln, um den Planeten zu heilen. 🌱✨",
    "Denk an eine Sache, die dich heute glücklich gemacht hat. Lächle 60 Sekunden lang. 🛌💭",
    "Mutter Erde wacht über dich. Umarme sie mit einem Lächeln zurück. 🌍❤️",
    "Das Universum hat dich allein durch dein Lächeln zur ‚Miss Innere Schönheit‘ ernannt, lächle! 👑🎉",
    "Ein Lächeln ist deine Rüstung. Trag sie und gewinne den Tag! 🛡️🏆",
    "Dein Lächeln bietet eine kostenlose Geistestherapie! Komm und frische dich auf. 💆‍♀️✨",
    "Dein Lächeln hält die Lösung für das bereit, was dir durch den Kopf geht. Finde sie in einer Minute! 💡🗝️",
    "Deine Augen sind müde... Frische sie mit dem schönen Anblick deines eigenen Lächelns auf! 👀✨",
    "Die Kraft deines Lächelns bringt sogar deine Kamera zum Lächeln! Erlebe das Wunder, Liebling. 📸😁",
    "Ein Lächeln verschönert dich. Trag dieses natürliche Make-up in nur einer Minute! 💄✨",
    "Deine Glücksmuskeln warten darauf zu tanzen. Lass sie, Boss! 💃😎",
    "Wie kann dein einfaches Lächeln so hell wie die Sonne sein? Finde das Geheimnis in nur 1 Minute heraus! ☀️✨"
};

String[] spanishQuotes = {
    "¡Hola! ¿Cuándo fue la última vez que admiraste tu propia sonrisa? 😊",
    "Tu sonrisa es el mejor maquillaje... ¿Quieres llevarla por 1 minuto? 💄✨",
    "¿Reto aceptado? ¿Puedes mantener una sonrisa durante 60 segundos ahora mismo? ⏱️😁",
    "La Madre Tierra espera su vista favorita... ¡Tu cara feliz! 🌍🌸",
    "¿Te sientes cansado? ¡Una sonrisa de 1 minuto funciona mejor que el café! ☕⚡",
    "Alguien necesita una sonrisa hoy... ¿Por qué no empezar contigo mismo? 💖",
    "No dejes que el mundo te robe la alegría. ¡Recupérala con una sonrisa! 🛡️😄",
    "Espejito, espejito... ¿Quién tiene la sonrisa más brillante de todas? 🪞✨",
    "Solo 1 minuto. Eso es todo lo que necesitas para cambiar tu ánimo. ¿Listo? 🧘‍♂️",
    "Tu sonrisa te sana primero a ti y luego al mundo. ¿Hora de sanar? 🩹❤️",
    "¿Alguna vez has observado tu propia sonrisa durante todo un minuto? ¡Pruébalo! 👏😍",
    "¿Quién desea ver tu cara sonriente? ¡Tú deberías! ¡Ven a verla brillar! 🌟👀",
    "Todos a tu alrededor admiran tu sonrisa... ¿Por qué tú no? ¡Ven a admirarla ahora! 🥰",
    "Tu ser interior es una maravilla que transmite en vivo a través de tu sonrisa. ¡Míralo aquí! 📡✨",
    "La Madre Tierra quiere abrazarte con un mensaje, pero primero, ¡necesita una sonrisa! 🫂🌿",
    "Detente. Respira. Sonríe. Estás exactamente donde debes estar. 🛑🌬️😊",
    "Tu sonrisa es el puente entre tu alma y el mundo. Crúzalo hoy. 🌉💫",
    "Advertencia: ¡Tu sonrisa es muy contagiosa! ¿Quieres iniciar un brote? ⚠️😆",
    "Piensa en tu recuerdo favorito... ahora mantén ese sentimiento durante 60 segundos. 💭🥰",
    "No necesitas una razón para sonreír. A veces, ¡la sonrisa ES la razón! 🎈",
    "Ejercita tu rostro: ¡flexiona esos 'músculos felices' durante un minuto completo! 💪😁",
    "La Madre Tierra habla en colores; tú hablas en sonrisas. Tengamos una conversación. 🌈🗣️",
    "No dejes que el mundo cambie tu sonrisa. Haz que tu sonrisa cambie el mundo. 🌍💫",
    "¿Te sientes abrumado? Una sonrisa de 60 segundos es la mejor medicina. ¡Empieza tu reto! 💊⏳",
    "¡Tu sonrisa de hoy es una oración! Pensemos juntos en nuestra familia global. 🙏🌏",
    "¡La felicidad es contagiosa! Comparte una sonrisa para sanar el planeta. 🌱✨",
    "Piensa en algo que te haya hecho feliz hoy. Sonríe durante 60 segundos. 🛌💭",
    "Mamá Tierra te cuida. Corresponde con una sonrisa. 🌍❤️",
    "El Universo te nombró 'Miss Belleza Interior' solo a través de tu sonrisa. ¡Sonríe! 👑🎉",
    "Una sonrisa es tu armadura. ¡Úsala y triunfa hoy! 🛡️🏆",
    "¡Tu sonrisa ofrece terapia mental gratis! Ven y refréscate. 💆‍♀️✨",
    "Tu sonrisa tiene la solución a lo que ronda por tu cabeza. ¡Descúbrela en un minuto! 💡🗝",
    "Tus ojos están cansados... ¡Refréscalos con la hermosa vista de tu propia sonrisa! 👀✨",
    "¡El poder de tu sonrisa puede hacer sonreír incluso a tu cámara! Sé testigo del milagro, cariño. 📸😁",
    "Una sonrisa te embellece. ¡Ven a usar este maquillaje natural en solo un minuto! 💄✨",
    "Tus músculos de la felicidad están esperando bailar. ¡Déjalos, jefe! 💃😎",
    "¿Cómo puede tu simple sonrisa ser tan brillante como el sol? ¡Descubre el secreto en 1 minuto! ☀️✨"
};

String[] frenchQuotes = {
    "Coucou ! À quand remonte la dernière fois où vous avez admiré votre propre sourire ? 😊",
    "Votre sourire est le meilleur maquillage... Envie de le porter pendant 1 minute ? 💄✨",
    "Défi accepté ? Pouvez-vous garder le sourire pendant 60 secondes dès maintenant ? ⏱️😁",
    "Mère Nature attend sa vue préférée... Votre visage heureux ! 🌍🌸",
    "Fatigué ? Un sourire d'une minute fonctionne mieux que le café ! ☕⚡",
    "Quelqu'un a besoin d'un sourire aujourd'hui... Pourquoi ne pas commencer par vous-même ? 💖",
    "Ne laissez pas le monde voler votre joie. Reprenez-la avec un sourire ! 🛡️😄",
    "Miroir, mon beau miroir... Qui a le sourire le plus éclatant de tous ? 🪞✨",
    "Juste 1 minute. C'est tout ce qu'il faut pour réinitialiser votre humeur. Prêt ? 🧘‍♂️",
    "Votre sourire vous guérit d'abord, puis guérit le monde. Il est temps de guérir ? 🩹❤️",
    "Avez-vous déjà regardé votre propre sourire pendant une minute entière ? Essayez ! 👏😍",
    "Qui souhaite voir votre visage souriant ? VOUS le devriez ! Venez le voir briller ! 🌟👀",
    "Tout le monde autour de vous admire votre sourire... Pourquoi pas vous ? Venez l'admirer ! 🥰",
    "Votre être intérieur est une merveille, diffusant en direct par votre sourire. Témoignez ici ! 📡✨",
    "Mère Nature veut vous serrer dans ses bras avec un message, mais d'abord, un sourire ! 🫂🌿",
    "Pause. Respirez. Souriez. Vous êtes exactement là où vous devez être. 🛑🌬️😊",
    "Votre sourire est le pont entre votre âme et le monde. Traversez-le aujourd'hui. 🌉💫",
    "Attention : Votre sourire est hautement contagieux ! Envie de déclencher une épidémie ? ⚠️😆",
    "Pensez à votre souvenir préféré... gardez ce sentiment pendant 60 secondes. 💭🥰",
    "Pas besoin de raison pour sourire. Parfois, le sourire EST la raison ! 🎈",
    "Faites faire de l'exercice à votre visage : pliez ces 'muscles du bonheur' pendant une minute ! 💪😁",
    "Mère Nature parle en couleurs ; vous parlez en sourires. Ayons une conversation. 🌈🗣️",
    "Ne laissez pas le monde changer votre sourire. Laissez votre sourire changer le monde. 🌍💫",
    "Vous vous sentez lourd ? Un sourire de 60 secondes est le meilleur remède. Lancez votre défi ! 💊⏳",
    "Votre sourire aujourd'hui est une prière ! Pensons ensemble à notre famille mondiale. 🙏🌏",
    "Le bonheur est contagieux ! Partagez un sourire pour guérir la planète. 🌱✨",
    "Pensez à une chose qui vous a rendu heureux aujourd'hui. Souriez pendant 60 seconds. 🛌💭",
    "Maman Terre veille sur vous. Rendez l'amour avec un sourire. 🌍❤️",
    "L'Univers vous a couronné 'Miss Beauté Intérieure' rien qu'à travers votre sourire, souriez ! 👑🎉",
    "Un sourire est votre armure. Venez la porter et gagnez la journée ! 🛡️🏆",
    "Votre sourire offre une thérapie mentale gratuite ! Venez vous ressourcer. 💆‍♀️✨",
    "Votre sourire détient la solution à vos pensées. Obtenez-la en une minute ! 💡🗝️",
    "Vos yeux sont fatigués... Rafraîchissez-les avec la belle vue de votre propre sourire ! 👀✨",
    "Le pouvoir de votre sourire peut même faire sourire votre appareil photo ! Témoignez du miracle. 📸😁",
    "Un sourire vous embellit. Venez porter ce maquillage naturel en une minute seulement ! 💄✨",
    "Vos muscles faciaux joyeux attendent de danser. Laissez-les faire, Boss ! 💃😎",
    "Comment votre simple sourire peut-il être aussi lumineux que le soleil ? Découvrez le secret en 1 min ! ☀️✨"
};

String[] japaneseQuotes = {
    "ねぇ！自分の笑顔を心から褒めたのはいつですか？😊",
    "あなたの笑顔は最高のメイクです…1分間つけてみませんか？💄✨",
    "チャレンジ受諾？今すぐ60秒間笑顔をキープできますか？⏱️😁",
    "母なる地球がお気に入りの景色を待っています…あなたの幸せな顔を！🌍🌸",
    "疲れていませんか？1分間の笑顔はコーヒーよりも効果的です！☕⚡",
    "今日、誰かがあなたの笑顔を必要としています…まずは自分から始めてみませんか？💖",
    "世界に喜びを奪われないで。笑顔で取り戻そう！🛡️😄",
    "鏡よ鏡、鏡さん…一番輝く笑顔の持ち主は誰？🪞✨",
    "たった1分。気分をリセットするのにそれだけあれば十分です。準備はいい？🧘‍♂️",
    "あなたの笑顔がまず自分を癒やし、そして世界を癒やす。癒やしの時間ですか？🩹❤️",
    "自分の笑顔を丸1分間じっくり見たことがありますか？試してみて！👏😍",
    "あなたの笑顔を見たいのは誰？あなた自身です！輝きを見に来て！🌟👀",
    "周りの人はみんなあなたの笑顔を褒めています…あなたも自分を褒めよう！🥰",
    "あなたの内面は驚異的で、笑顔を通じて生中継されています。ここで目撃して！📡✨",
    "母なる地球がメッセージを込めてハグしたがっています。まずは笑顔を！🫂🌿",
    "立ち止まって。深呼吸して。笑顔に。あなたはいるべき場所にいます。🛑🌬️😊",
    "あなたの笑顔は魂と世界を結ぶ架け橋。今日はそれを渡ってみよう。🌉💫",
    "警告：あなたの笑顔は非常に伝染しやすいです！流行を仕掛けますか？⚠️😆",
    "一番好きな思い出を思い浮かべて…その気持ちを60秒間キープして。💭🥰",
    "笑顔に理由はいらない。時々、笑顔「そのもの」が理由になるから！🎈",
    "顔のワークアウト—「ハッピー筋肉」を丸1分間フル稼働させよう！ 💪😁",
    "母なる地球は色で語り、あなたは笑顔で語る。おしゃべりしよう。🌈🗣️",
    "世界に笑顔を変えさせないで。あなたの笑顔で世界を変えよう。🌍💫",
    "気分が重い？60秒の笑顔が一番の薬。今すぐチャレンジを始めよう！💊⏳",
    "今日のあなたの笑顔は祈り！地球の家族について一緒に考えよう。 🙏🌏",
    "幸せは伝染する！笑顔を分けて地球を癒やそう。 🌱✨",
    "今日嬉しかったことを1つ思い出して。60秒間笑顔でいよう。 🛌💭",
    "大地の母があなたを見守っています。笑顔でお返しを。 🌍❤️",
    "宇宙はあなたの笑顔だけであなたを「ミス・インナービューティー」に認定しました。笑って！👑🎉",
    "笑顔はあなたの鎧。身につけて今日を勝利しよう！🛡️🏆",
    "あなたの笑顔は無料のマインドセラピー！リフレッシュしに来て。 💆‍♀️✨",
    "あなたの笑顔には悩みの答えが隠されています。たった1分で見つけよう！💡🗝️",
    "目が疲れていませんか…自分の笑顔の美しい景色でリフレッシュ！ 👀✨",
    "あなたの笑顔のパワーは、カメラさえも笑顔にしてしまう！奇跡を目撃して。 📸😁",
    "笑顔はあなたを美しくする。たった1分でこのナチュラルメイクをまとおう！ 💄✨",
    "幸せな表情筋がダンスしたがっています。踊らせてあげて、ボス！ 💃😎",
    "あなたのシンプルな笑顔が太陽のように輝く理由は？たった1分で秘密を暴こう！ ☀️✨"
};

String[] chineseQuotes = {
    "嘿！上一次真正欣赏自己的微笑是什么时候？😊",
    "你的微笑是最好的化妆品……想戴着它1分钟吗？💄✨",
    "接受挑战？现在能保持微笑60秒吗？⏱️😁",
    "大地母亲正在等待她最喜欢的风景……你开心的脸庞！🌍🌸",
    "觉得累吗？笑1分钟比咖啡管用！☕⚡",
    "今天有人需要一个微笑……为什么不从你自己开始呢？💖",
    "别让世界偷走你的快乐。用微笑把它夺回来！🛡️😄",
    "魔镜魔镜告诉我……谁的笑容最灿烂？🪞✨",
    "只需1分钟。这就是重置心情所需的一切。准备好了吗？🧘‍♂️",
    "你的微笑首先治愈你自己，然后治愈世界。是时候治愈了吗？🩹❤️",
    "你曾完整地观察过自己整整一分钟的微笑吗？试一试吧！👏😍",
    "谁最想看到你的笑脸？你必须是其中之一！来看它闪耀吧！🌟👀",
    "你身边的每个人都在赞美你的微笑……为什么你不呢？现在来欣赏它！🥰",
    "你的内在美是一个奇迹，正通过你的微笑进行现场直播。来这里见证！📡✨",
    "大地母亲想带给你一个充满讯息的拥抱，但首先，她需要一个微笑！🫂🌿",
    "停下。深呼吸。微笑。你正处于你该在的地方。 🛑🌬️😊",
    "你的微笑是你灵魂与世界之间的桥梁。今天就走过它吧。 🌉💫",
    "警告：你的微笑极具传染性！想引发一场热潮吗？⚠️😆",
    "想想你最喜欢的记忆……现在把那种感觉保持60秒。💭🥰",
    "你不需要理由去微笑。有时候，微笑本身就是理由！🎈",
    "给你的脸做个锻炼——全力活动那些“快乐肌肉”整整一分钟！💪😁",
    "大地母亲用色彩诉说；你用微笑诉说。让我们来一场对话吧。 🌈🗣️",
    "别让世界改变你的微笑。让你的微笑改变世界。 🌍💫",
    "感觉沉重吗？60秒的微笑是最好的良药。现在开始你的挑战！💊⏳",
    "你今天的微笑就是一个祈祷！让我们一起想想我们的全球大家庭。 🙏🌏",
    "快乐会传染！分享一个微笑来治愈地球。 🌱✨",
    "想想今天让你开心的一件事。微笑60秒。 🛌💭",
    "大地母亲正在守护着你。用微笑回馈她吧。 🌍❤️",
    "宇宙仅仅通过你的微笑就授予你“内在美小姐”的称号，笑一个吧！👑🎉",
    "微笑是你的盔甲。穿上它，赢得今天！🛡️🏆",
    "你的微笑提供免费的心灵理疗！来让自己焕然一新吧。 💆‍♀️✨",
    "你的微笑藏着你心事答案。只需一分钟就能解开！💡🗝️",
    "你的眼睛累了……用你自己的微笑的美丽景色来刷新它们吧！ 👀✨",
    "你微笑的力量甚至能让你的相机也跟着微笑！亲爱的，见证奇迹吧。 📸😁",
    "微笑为你增添美丽。只需一分钟，穿上这款天然妆容！ 💄✨",
    "你快乐的面部肌肉正在等待跳舞。让它们动起来吧，老板！ 💃😎",
    "你的简单微笑怎么能像太阳一样灿烂？只需1分钟挖掘这个秘密！ ☀️✨"
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
        
        // 🌍 Automatically detect device language
        String language = java.util.Locale.getDefault().getLanguage();
        String[] selectedQuotes;

        switch (language) {
            case "de":
                selectedQuotes = germanQuotes;
                break;
            case "es":
                selectedQuotes = spanishQuotes;
                break;
            case "fr":
                selectedQuotes = frenchQuotes;
                break;
            case "ja":
                selectedQuotes = japaneseQuotes;
                break;
            case "zh":
                selectedQuotes = chineseQuotes;
                break;
            default:
                selectedQuotes = englishQuotes; // Fallback to English
                break;
        }

        List<String> quoteDeck = new ArrayList<>(Arrays.asList(selectedQuotes));
        Collections.shuffle(quoteDeck); // Randomize

        Calendar calendar = Calendar.getInstance();

        // Schedule for the next 7 days
        for (int i = 0; i < 7; i++) {
            Calendar alarmCal = Calendar.getInstance();
            alarmCal.add(Calendar.DAY_OF_YEAR, i);
            int dayOfYear = alarmCal.get(Calendar.DAY_OF_YEAR);

            String morningQuote = (i * 2 < quoteDeck.size()) ? quoteDeck.get(i * 2) : quoteDeck.get(0);
            String eveningQuote = (i * 2 + 1 < quoteDeck.size()) ? quoteDeck.get(i * 2 + 1) : quoteDeck.get(1);

            // MORNING ALARM (9:00 AM)
            scheduleSingleNotification(alarmManager, alarmCal, 9, 0, morningQuote, 1000 + dayOfYear);

            // EVENING ALARM (6:00 PM)
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