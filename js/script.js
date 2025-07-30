function handleInputChange_1(input) {
  const $input = $(input);
  const container = $input.closest('.card');

  const selectedMainRadio = container.find('input[name="main-method-contact"]:checked');

  container.find('.sub-options').addClass('hidden');

  if (selectedMainRadio.length) {
    selectedMainRadio.closest('.radio-card').find('> .sub-options').removeClass('hidden');
  }

}




function handleInputChange_3(input) {
  const $input = $(input);

  var container;
  if ($(input).closest("#step-3").length > 0) {
    container = $input.closest('.section');

  } else {
    container = $input.closest('.card, .section');

  }


  container.find('.sub-options').addClass('hidden');
  container.find('[data-id]').addClass('hidden');

  container.find('input[type="radio"]:checked').each(function () {
    const showIds = $(this).closest('[data-show]').data('show');
    if (showIds) {
      showIds.split(',').map(id => id.trim()).forEach(id => {
        container.find(`[data-id="${id}"]`).removeClass('hidden');
      });
    }
  });

  container.find('input[type="radio"]:checked').each(function () {
    $(this).closest('.radio-card').find('> .sub-options').removeClass('hidden');
  });

  container.find('input[type="checkbox"]:checked').each(function () {
    const $cb = $(this);
    if ($cb.closest('.radio-card, .sub-options').is(':visible')) {
      $cb.closest('.radio-card').find('> .sub-options').removeClass('hidden');
    }
  });

  container.find('input[type="radio"]:checked').each(function () {
    const $radio = $(this);
    const name = $radio.attr('name');
    $radio.closest('.radio-card').find('> .sub-options').removeClass('hidden');
  });
}




$(document).on('change', 'input[type="radio"], input[type="checkbox"]', function () {


  if ($(this).closest("#step-1").length > 0) {

    handleInputChange_1(this);

  } else {

    handleInputChange_3(this);
  }

});




let rowIndex = 1;

$(document).on('click', '.addRowBtn', function () {
  const container = $(this).closest('.sub-options, .dup-row');
  const wrapper = $(this).closest('.addRow-lang');

  const firstRow = container.find('.age-range-row').first();
  const newRow = firstRow.clone(true);

  rowIndex++;

  newRow.find('input, select').each(function () {
    const oldId = $(this).attr('id');
    const newId = oldId ? `${oldId}_${rowIndex}` : `generated_${rowIndex}_${Math.random().toString(36).substr(2, 5)}`;
    $(this).attr('id', newId).val('').removeClass('is-invalid');

    newRow.find(`label[for="${oldId}"]`).attr('for', newId);
  });

  newRow.find('.form-text-error').addClass('d-none');
  newRow.find('.remove-btn').removeClass('d-none');

  container.find('.addRowBtn').before(newRow);

  if (wrapper.length) {
    wrapper.find('.addRowBtn').hide();
  }

});



$(document).on('click', '.remove-row', function (e) {

  const row = $(this).closest('.age-range-row');
  const container = row.closest('.sub-options');
  const wrapper = row.closest('.addRow-lang');
  row.remove();

  if (wrapper.length) {
    const rows = container.find('.age-range-row');
    if (rows.length === 1) {
      wrapper.find('.addRowBtn').show();
    }
  }
});


$(document).on('click', '.sub-choice', function (e) {
  e.preventDefault();
  $(this).closest('.sub-options').find('.option-card').removeClass('selected');
  $(this).addClass('selected');
  $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
});


$(document).ready(function () {
  $('.next-btn').on('click', function () {
    const currentStep = $(this).closest('.step');
    const nextStep = currentStep.next('.step');

    currentStep.find('.card').removeClass('border border-danger');

    const invalidFields = currentStep.find(':input[required]').filter(function () {
      return !this.value.trim();
    });

    if (invalidFields.length > 0) {
      invalidFields.each(function () {
        $(this).closest('.card').addClass('border border-danger');
      });


      invalidFields.first().focus();

      return;
    }

    if (nextStep.length) {
      currentStep.addClass('d-none');
      nextStep.removeClass('d-none');
    }
  });

  $('.prev-btn').on('click', function () {
    const currentStep = $(this).closest('.step');
    const prevStep = currentStep.prev('.step');

    currentStep.find('.card').removeClass('border border-danger');

    if (prevStep.length) {
      currentStep.addClass('d-none');
      prevStep.removeClass('d-none');
    }
  });

  let min = $('[name="main-method-contact"]:checked').data('min');

  $("#incentive-amount-help .required").text(min);
  $("#incentive-amount").attr('min', min);
});

/*------------------------------------------*/

$('#incentive-amount').on('input', function () {
  var min = parseInt($(this).attr('min'));
  var value = parseInt($(this).val());

  if (value < min) {
    $("#incentive-amount-help").addClass('text-danger');

  } else {
    $("#incentive-amount-help").removeClass('text-danger');

  }
});



$('[name="main-method-contact"]').change(function (e) {


  let min = $(this).data('min');

  $("#incentive-amount-help .required").text(min);
  $("#incentive-amount").attr('min', min);
  let online = $(this).attr('data-online');
  if (online == 'true') {
    $('.for-online').removeClass('d-none');
    $('.for-offline').addClass('d-none');
    $('.p-tools').removeClass('hidden');
    $('.p-duration').addClass('hidden');

  } else {
    $('.for-online').addClass('d-none');
    $('.for-offline').removeClass('d-none');
    $('.p-tools').addClass('hidden');
    $('.p-duration').removeClass('hidden');

  }

  $('.con-study-method').text($(this).val());
});

var user_price = 150;
var location_price = 30;
var users = 6;

var total_price = 0;

$(document).ready(function () {

  price = user_price * users;
  total_price = price;
  $('[name="single-amount"]').val(users);

  $('.participants .price').text(price);
  $('.participants .number').text(users);

  $('.total_price').text(total_price);

  $('.con-study-method').text($('[name="main-method-contact"]:checked').val());
  $('.con-employment').text($('[name="test-user-group"]:checked').val());
  $('.con-age').text($('[name="age-selection-method"]:checked').val());
  $('.con-gender').text($('[name="tester-type"]:checked').val());
  $('.con-country').text($('[name="residency_method"]:checked').val());
  $('.con-additional').text($('[name="write_question"]:checked').val());

  $('.con-requirements').text($('[name="device_requirement"]:checked').val());
  $('.con-tools').text($('[name="remote_tool"]:checked').val());

  $('.con-document').text($('[name="document_signing_method"]:checked').val());





  $('.con-users').text(users);
});

function sumPrices() {
  let total = 0;
  $('.price-list .d-flex:not(.d-none) .price').each(function () {
    const val = parseFloat($(this).text().replace(/[^0-9.-]+/g, ""));
    if (!isNaN(val)) {
      total += val;
    }
  });
  return total;
}







$(document).on('input', '[name="numberTester"]', function () {

  let val = parseInt($(this).val(), 10);
  if (val < 1 || isNaN(val)) {
    $(this).val(1);
  }

  users = $(this).val()
  price = user_price * users;
  $('.participants .price').text(price);
  $('.participants .number').text(users);
  $('[name="sub-method-1"]:checked, [name="sub-method-2"]:checked, [name="sub-method-3"]:checked').trigger('change');

  $('[name="single-amount"]').val(users);

  $('[name="age-selection-method"]:checked').trigger('change');
  $('[name="tester-type"]:checked').trigger('change');
  $('select[name="languages[]"]').trigger('change');
  $('[name="write_question"]:checked').trigger('change');
  $('[name="device_requirement"]:checked').trigger('change');
  $('[name="incentive_amount"]').trigger('input');
  $('[name="document_signing_method"]:checked').trigger('change');
  $('.total_price').text(sumPrices());

  $('.con-users').text(users);



});


$(document).on('change', '[name="sub-method-1"],[name="sub-method-2"],[name="sub-method-3"]', function () {

  const $mainMethod = $(this).closest('.radio-card').find('[name="main-method-contact"]');
  if (!$mainMethod.is(':checked')) {
    return;
  }


  val = $(this).val()
  price = location_price * users;

  if (val == 'onsite') {
    $('.at_location').removeClass(' d-none');
    $('.at_location .price').text(price);
  } else {
    $('.at_location').addClass(' d-none');
  }

  if (val == 'home') {
    $('.at_home').removeClass(' d-none');
    $('.at_home .price').text(price);
  } else {
    $('.at_home').addClass(' d-none');

  }

  $('.total_price').text(sumPrices());
});

$(document).on('change', '[name="main-method-contact"]', function () {

  $('.at_home,.at_location').addClass('d-none');
  const $radioCard = $(this).closest('.radio-card');
  $radioCard.find('.sub-choice').removeClass('selected');
  $radioCard.find('.sub-choice input[type="radio"]').prop('checked', false);
  const $firstSubChoice = $radioCard.find('.sub-choice').first();
  $firstSubChoice.addClass('selected');
  $firstSubChoice.find('input[type="radio"]').prop('checked', true);

  $('.total_price').text(sumPrices());
});


$(document).on('change', '[name="age-selection-method"]', function () {
  let val = $(this).data('show');
  let price = 0;

  if (val === '#single-age-range') {
    price = 5;
  } else if (val === '#multi-age-range') {
    price = 10;
  }

  if (price > 0) {
    $('.price-list .age').removeClass('d-none');
    $('.price-list .age .price').text(users * price);
  } else {
    $('.price-list .age').addClass('d-none');
  }
  $('.total_price').text(sumPrices());
});


$(document).on('change', '[name="tester-type"]', function () {


  let selectedValue = $(this).data('value');
  let price = 0;


  if (selectedValue === 'balanced') {
    price = 5;
  } else if (selectedValue === 'specific_gender') {
    price = 10;
  }


  if (price > 0) {
    $('.price-list .gender').removeClass('d-none');
    $('.price-list .gender .price').text(users * price);
  } else {
    $('.price-list .gender').addClass('d-none');
  }

  $('.total_price').text(sumPrices());
});



$(document).on('input', 'input[name="multi-amount[]"]', function () {
  let total = 0;
  let usersLimit = typeof users !== 'undefined' ? users : 0;

  $('input[name="multi-amount[]"]').each(function () {
    let val = parseInt($(this).val(), 10);
    if (!isNaN(val)) {
      total += val;
    }
  });

  if (total > usersLimit) {
    $(this).val('');
    alert(`لا يمكنك تجاوز عدد المستخدمين الإجمالي: ${usersLimit}`);

  }
  $('.total_price').text(sumPrices());
});


$(document).on('input', 'input[name="tester-female-count"], input[name="tester-male-count"]', function () {
  let femaleVal = parseInt($('input[name="tester-female-count"]').val(), 10) || 0;
  let maleVal = parseInt($('input[name="tester-male-count"]').val(), 10) || 0;
  let total = femaleVal + maleVal;
  let usersLimit = typeof users !== 'undefined' ? users : 0;

  if (total > usersLimit) {
    $(this).val('');
    alert(`لا يمكنك تجاوز عدد المستخدمين الإجمالي: ${usersLimit}`);
  }
  $('.total_price').text(sumPrices());
});



function updateLanguagePrice() {
  let pricePerLanguage = 5;
  let usersCount = typeof users !== 'undefined' ? users : 0;

  let selectedLanguagesCount = $('select[name="languages[]"]').filter(function () {
    let val = $(this).val();
    let id = $(this).attr('id') || '';
    return val !== null && val !== '' && val !== 'اختر' && id !== 'language_select_0';
  }).length;

  if (selectedLanguagesCount > 0) {
    let totalPrice = selectedLanguagesCount * pricePerLanguage * usersCount;
    $('.price-list .languages').removeClass('d-none');
    $('.price-list .languages .price').text(totalPrice);
  } else {
    $('.price-list .languages').addClass('d-none');
  }
  $('.total_price').text(sumPrices());
}


$(document).on('change', 'select[name="languages[]"]', updateLanguagePrice);
$(document).on('click', '.addRow-lang .remove-row', updateLanguagePrice);






$(document).on('change', '[name="write_question"]', function () {

  let price = 0;

  const selectedVal = $(this).data('value');
  if (selectedVal === 'expert-prepared' || selectedVal === 'self-written') {
    price = 10;
  }

  if (price > 0) {
    $('.price-list .question').removeClass('d-none');
    $('.price-list .question .price').text(users * price);
  } else {
    $('.price-list .question').addClass('d-none');
  }
  $('.total_price').text(sumPrices());



  $('.con-additional').text($(this).val());



});

$(document).on('change', '[name="device_requirement"]', function () {

  let price = 0;

  const selectedVal = $(this).data('value');
  if (selectedVal === 'spacific_device') {
    price = 5;
  }

  if (price > 0) {
    $('.price-list .devices').removeClass('d-none');
    $('.price-list .devices .price').text(users * price);
  } else {
    $('.price-list .devices').addClass('d-none');
  }
  $('.total_price').text(sumPrices());


  $('.con-requirements').text($(this).val());


});


function getDatePlusDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('start-date').value = getDatePlusDays(0);
document.getElementById('end-date').value = getDatePlusDays(5);




$(document).on('input', '[name="incentive_amount"]', function () {
  const price = parseFloat($(this).val());

  if (!isNaN(price) && price > 0) {
    $('.price-list .incentives').removeClass('d-none');
    $('.price-list .incentives .price').text(users * price);
  } else {
    $('.price-list .incentives').addClass('d-none');
  }
  $('.total_price').text(sumPrices());
});



$(document).on('change', '[name="document_signing_method"]', function () {
  let price = 0;
  const selectedVal = $(this).data('value');

  if (selectedVal === 'existing' || selectedVal === 'upload') {
    price = 10;
  }

  if (price > 0) {
    $('.price-list .documents').removeClass('d-none');
    $('.price-list .documents .price').text(users * price);
  } else {
    $('.price-list .documents').addClass('d-none');
  }
  $('.total_price').text(sumPrices());

  $('.con-document').text($(this).val());


});



$(document).on('input', '#project-name', function () {
  let val = $(this).val();

  $('.con-project-name').html(val);
});

$(document).on("change", "input[name='test-user-group']", function () {
  $('.con-employment').text($(this).val());

});

$(document).on("change", "input[name='age-selection-method']", function () {
  $('.con-age').text($(this).val());

});


$(document).on("change", "input[name='tester-type']", function () {
  $('.con-gender').text($(this).val());

});

$(document).on("change", "input[name='residency_method']", function () {
  $('.con-country').text($(this).val());

});



$(document).on("change", '[name="languages[]"]', function () {

  let selectedLanguages = [];
  $('[name="languages[]"]').each(function () {
    const val = $(this).val();
    if (val) {
      selectedLanguages.push(val);
    }
  });
  $('.con-languages').text(selectedLanguages.join(', '));
});


$(document).on("change", '[name="residency_countries[]"]', function () {

  let selectedLanguages = [];
  $('[name="residency_countries[]"]').each(function () {
    const val = $(this).val();
    if (val) {
      selectedLanguages.push(val);
    }
  });
  $('.con-country').text(selectedLanguages.join(', '));
});

$(document).on("change", '[name="devices[]"]', function () {


  let selectedLanguages = [];
  $('[name="devices[]"]').each(function () {
    const val = $(this).val();
    if (val) {
      selectedLanguages.push(val);
    }
  });

  if (selectedLanguages.length > 0) {
    $('.p-device').removeClass('hidden');
  }

  $('.con-device').text(selectedLanguages.join(', '));
});


$(document).on("change", "input[name='remote_tool']", function () {
  $('.con-tools').text($(this).val());
});


$(document).on('input', '[name="remote_tool_link"]', function () {

  $('.p-details').removeClass('hidden');

  $('.con-details').text($(this).val());

});


$(document).on("change", '[name="session-duration"]', function () {
  $('.con-duration').text($(this).val());
});
