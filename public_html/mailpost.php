<?
	if($_POST['phone']=='' ) {
		echo 'error-1';
	} else {
		$_POST["name"] =  substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
		$mName = $_POST["name"];

		$_POST["phone"] =  substr(htmlspecialchars(trim($_POST['phone'])), 0, 100);
		$mPhone = $_POST["phone"];

		$_POST["mail"] =  substr(htmlspecialchars(trim($_POST['mail'])), 0, 100);
		$mMail = $_POST["mail"];

		$_POST["message"] =  substr(htmlspecialchars(trim($_POST['message'])), 0, 300);
		$mMessage = $_POST["message"];

		$_POST["formAction"] =  substr(htmlspecialchars(trim($_POST['formAction'])), 0, 100);
		$mAction = $_POST["formAction"];

		$to  = "rabota@stormtaxi.ru";
		$subject = "Новая заявка с сайта";

		$message = '
		<html>
			<head>
			</head>
			<body>
			<div style="background-color: #fff; color: #000; padding-top: 10px; padding-bottom: 20px; font-family: Tahoma; font-size: 18px; width: 100%; text-align: center;">
				<p>Поступила новая заявка</p><br>
				<div style="width: 500px; margin:0 auto;">
					<div style="text-align: left">
						<p><b>Имя:</b> '.$mName.'</p>
						<p><b>Телефон:</b> '.$mPhone.'</p>
						<p><b>Почта:</b> '.$mMail.'</p>
						<p><b>Сообщение:</b> '.$mMessage.'</p>
						<p><b>Действие:</b> '.$mAction.'</p>
					</div>
				</div>
			</div>
			</body>
		</html>';

		$headers  = "Content-type: text/html; charset=utf-8 \r\n"."From: rabota@stormtaxi.ru\r\n";

		if (mail($to, $subject, $message, $headers)) {
			echo 'success';
		} else {
			echo 'error-2';
		}


	}
?>