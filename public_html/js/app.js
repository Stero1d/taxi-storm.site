$(document).ready(function () {

    /*маска телефона*/
    $(".phone_field").mask("+7 (999) 999-99-99");

    /*плавная прокрутка*/
    $('a[href^="#"]').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - 40;
        $('html, body').stop().animate( { scrollTop: destination }, 1100 );
        return false;
    });

    $('.client_recall').owlCarousel({
        items:1,
        nav: true,
        navText: ['<', '>'],
        margin: 10,
    });


    //модалка заказать звонок
    $('.js-recall').click(function () {
        $('.js-recall-form').arcticmodal();
        return false;
    });
    //обработка отправки данных с формы
    $('form').on('submit', sendEmail);

    //отправка данных на сервер
    function sendEmail (e) {
        e.preventDefault();
        var $form = $(this);
        var hasError = false;

        var formAction = $form.attr('data-form-action') || 'Неизвесная фоома';
        var formActionId = $form.attr('data-form-action-id');

        var $nameInput = $form.find('input[data-name="name"]');
        var $phoneInput = $form.find('input[data-name="phone"]');
        var $emailInput = $form.find('input[data-name="email"]');
        var $messageInput = $form.find('textarea[data-name="message"]');

        var valName = $nameInput.length > 0 ? $nameInput.val() : '';
        var valPhone = $phoneInput.length > 0 ? $phoneInput.val() : '';
        var valEmail = $emailInput.length > 0 ? $emailInput.val() : '';
        var valMessage = $messageInput.length > 0 ? $messageInput.val() : '';

        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($emailInput.val() && !pattern.test(valEmail)){
            $emailInput.val('');
            $emailInput.attr("placeholder", "Пример test@test.ru");
            $emailInput.addClass('invalid_text_field');
            hasError = true;
        }
        if (valPhone == '') {
            $phoneInput.addClass('invalid_text_field');
            hasError = true;
        }
        if (valName == '') {
            $nameInput.addClass('invalid_text_field');
            hasError = true;
        }
        setTimeout(function(){
            $form.find('.invalid_text_field').removeClass('invalid_text_field');
        }, 3000);

        if (hasError) {
            return false;
        }
        var obj = {
            phone: valPhone,
            name: valName,
            mail: valEmail,
            message: valMessage,
            formAction: formAction
        };
        $.ajax({
            type: "POST",
            url: "mailpost.php",
            data: obj,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function(){
            },
            success: function(html){
                //счетчик яндекса

                setTimeout(function() {
                    $.arcticmodal('close');
                    $nameInput.val("");
                    $phoneInput.val("");
                    $emailInput.val("");
                    $messageInput.val("");
                }, 1000);
            }
        });
    }

});


