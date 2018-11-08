<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true);

try {

    $mail->SMTPDebug = 2; // режим отладки, уберите эту сточку после отладки
    $mail->isSMTP();
    $mail->Host = 'smtp.yandex.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'imoldev@yandex.ru'; // имя пользователя yandex
    $mail->Password = 'devops'; // пароль на yandex
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->CharSet = 'UTF-8';

    $mail->isHTML(true);

    $mail->setFrom('imoldev@yandex.ru', 'Игорь');

    $mail->addAddress('imoldev@yandex.ru', 'Тестировщик');
    $mail->addAddress('steklodekor@inbox.ru', 'Тестировщик');
    $mail->addAddress('imoldev@gmail.com', 'Тестировщик');
    $mail->addAddress('imoldev@rambler.ru', 'Тестировщик');

    $mail->Subject = 'Тестовое письмо';
    $mail->Body = file_get_contents(__DIR__ . '/../dist/index.html');

    $mail->send();

    echo 'Письмо отправлено!';

} catch (Exception $e) {
    echo 'Не возможно отправить письмо. Ошибка: ', $mail->ErrorInfo;
}

