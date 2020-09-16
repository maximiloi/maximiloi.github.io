<?php
// Файлы phpmailer
require 'class.phpmailer.php';
require 'class.smtp.php';

$name = $_POST['name'];
$number = $_POST['number'];
$email = $_POST['email'];

// Настройки
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP(); 
$mail->Host = 'ssl://server216.hosting.reg.ru';
$mail->SMTPAuth = true;                      
$mail->Username = 'robot@imbir-dostavka.ru'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = 'B2o3R0x6'; // Ваш пароль
//$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465;
$mail->setFrom('robot@imbir-dostavka.ru'); // Ваш Email

//$mail->addAddress('imbirdostavkasushi@inbox.ru'); // Email получателя
$mail->addAddress('maxim.iloi@yandex.ru');
//$mail->addAddress('maximiloi@gmail.com'); // Еще один email, если нужно.


$message = '<table>';
$message .='<tr style="background-color: #f8f8f8">
				<td colspan="1" valign="center" 	style="padding: 15px; border: #e9e9e9 1px solid;">Название блюда</td>
				<td colspan="1" align="center" valign="center" 	style="padding: 15px; border: #e9e9e9 1px solid;">Количество</td>
				<td colspan="1" align="center" valign="center" 	style="padding: 15px; border: #e9e9e9 1px solid;">Цена</td>
			</td>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id=>$count) {

    $message .='<tr style="background-color: #fff">
							<td valign="center" style="padding: 15px; border: #e9e9e9 1px solid;">' .$json[$id]['name']. '</td>';
    $message .='<td align="center" valign="center" style="padding: 15px; border: #e9e9e9 1px solid;">' .$count. '</td>';
    $message .='<td align="center" valign="center" style="padding: 15px; border: #e9e9e9 1px solid;">' .$count*$json[$id]['cost']. '₽</td></td>';

    $sum = $sum +$count*$json[$id]['cost'];
}

$message .='<tr style="background-color: #f8f8f8">
			  <td colspan="1"  valign="center" style="padding: 15px; border: #e9e9e9 1px solid;">К оплате</td>
			  <td colspan="2" align="center" valign="center" style="padding: 15px; border: #e9e9e9 1px solid;">' .$sum.'₽</td>
			</td>';

$message .='<p>Имя клиента: '.$_POST['ename'].'</p>';
$message .='<p>Номер телефона: +'.$_POST['ephone'].'</p>';

$mail->Subject = '"ИМБИРЬ" - Новый заказ на сумму ' .$sum.'₽';
$mail->Body    = $message;
$mail->AltBody = '';


if(!$mail->send()) {
    echo 'Error';
} else {
    return true;
}
?>