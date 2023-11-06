
var requiredFieldErrorColor = '0px 0px 7px red';
var mMessage = [];
var mElement = [];
var ApplicationLoan = null;
var mFamEditMode = '';
var mFamEditID = '';


$(document).ready(function () {
    window.scrollTo(0, 0);


    LoadReferences();

    //$(this).attr('data-toggle', 'modal');
  //  $(this).attr('data-target', '#modalAgentInfo');
   // $('#modalAgentInfo').modal('show');

});

$("#btnSaveApp").unbind("click").click(function (e) {
    var userConfirmation = window.confirm("Are you sure you want to proceed saving the application?");

    // Step 2: Check if the user clicked "OK" or "Cancel"
    if (userConfirmation) {
      // Step 3: Display the second alert
      alert("Thank you! the copy of your application will be sent to your email. Reference Code: 12345678");
    } else {
      // Step 4: Handle the "Cancel" action (optional)
     
    }
});
$("#submitBtn").unbind("click").click(function (e) {
    var _validatep1 = true;
    var _validatep2 = true;

    _validatep1 = validate('#nav-p1');
    _validatep2 = validate('#nav-p2');

    if (_validatep1 && _validatep2) {
        $(this).attr('data-toggle', 'modal');
        $(this).attr('data-target', '#modalAgentInfo');
        $('#modalAgentInfo').modal('show');
      //  alert("Thank you for submitting!")
        //e.preventDefault(); // Prevent the default form submission
       // InitializeSaveApplication();

    } else {
        if (mMessage == '') {
            alert('Please check the highlighted fields.');
        } else {
            alert(mMessage[0]);
            document.getElementById(mElement[0]).focus();
            mMessage = [];
            mElement = [];
        }

        e.stopPropagation();
    }

   
 
   
});





   



$("#radioPai1").on("click", function () {
    document.getElementById("myid1radioPAI").disabled = true;
    document.getElementById("myid2radioPAI").disabled = true;
    document.getElementById("myid1radioPAI").checked = false;
    document.getElementById("myid2radioPAI").checked = false;

 });
$("#radioPai").on("click", function () {
    document.getElementById("myid1radioPAI").disabled = false;
    document.getElementById("myid2radioPAI").disabled = false;
});

$("#txtAgentName").on("change", function () {
    $('#txtAgentEmail').val($('#txtAgentName').val());
   
});





function LoadReferences() {
    populateCountryDropdown($('#txtNationality'));
    populateRelDropdown($('#txtrelationship'));
    populateAgentDropdown($('#txtAgentName'));

    for (let i = 1; i <= 6; i++) {
        populateRegionDropdown($('#region' + i));
    }
}


/*--------------------start code1------------------*/
//this code is for input field to only allow characters. Attach -onkeypress="return isCharOnly(event);"- to the input field to use
function isCharOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (evt.ctrlKey) {
        evt.preventDefault();
    } else {
        if (!((charCode == 8) || (charCode == 32) || (charCode == 46) || (charCode >= 35 && charCode <= 40) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) || (charCode == 20)) {
            if (!isValidCharacter(evt.key)) {
                evt.preventDefault();
                return true;
            }
        }
    }
    return true;
}
// Define a custom validation function to check if a character is valid
function isValidCharacter(character) {
    // Add your own validation logic here
    // Example: Allow only letters 'a' to 'z' and 'A' to 'Z'
    var validCharacters = /^[A-Za-z]+$/;
    return validCharacters.test(character);
}
/*--------------------end code 1------------------*/


/*--------------------start code2------------------*/
//this code is date of birth. This displays format "15-Jan-2022" and disables future dates. use bootstrap-datepicker.min.css and js 1.9.0 to work
$(document).ready(function () {
    $('.date_input').datepicker({
        format: 'dd-M-yyyy',
        autoclose: true,
        endDate: new Date() // This disables future dates
    });
});

// for user who wants to manually enter date
function isDate(evt, obj) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    var allowedCharacters = [47, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45];
    var isValidInput = false;

    for (var i = allowedCharacters.length - 1; i >= 0; i--) {
        if (allowedCharacters[i] == charCode) {
            isValidInput = true;
        }
    }

    var len = $(obj).val().length;

    if (len !== 1 || len !== 3) {
        if (evt.keyCode == 47) {
            evt.preventDefault();
        }
    }

    // If they don't add the slash, do it for them...
    if (len === 2) {
        obj.value += '-';
    }

    // If they don't add the slash, do it for them...
    if (len === 5) {
        obj.value += '-';
    }

    if (isValidInput === false) {
        evt.preventDefault();
        return false;
    }

    return true;
}

/*--------------------end code 2------------------*/




/*--------------------start code 3------------------*/
//use to navigate between nav tabs using left and right button
function moveTab(nextOrPrev) {
    var mTotalTabs = $('#nav-main-tab a').length;
    var currentTab;
    $('.nav-tabs a').not('disabledTab').each(function () {
        if ($(this).hasClass('active')) {
            currentTab = $(this);
        }
    });
    if (nextOrPrev == "NEXT") { //if click next
        if (validate($(currentTab).attr('href')) === true) { // call function validate first before switching tab 
            currentTab.removeClass('active'); //if success switch tab
            currentTab.next().addClass('active');
            $($(currentTab).attr('href')).removeClass('show active');
            $($(currentTab).next().attr('href')).addClass('show active');
            href = $(currentTab).next().attr('href');
        } else { //if failed returns alert and dont proceed
            alert('Please check the highlighted fields.');
        }
    } else { //if click previous
            currentTab.removeClass('active');
            currentTab.prev().addClass('active');
            $($(currentTab).attr('href')).removeClass('show active');
            $($(currentTab).prev().attr('href')).addClass('show active');
            href = $(currentTab).prev().attr('href');
    }

    $('#nav-main-tab a').not('disabledTab').each(function () {
        if ($(this).hasClass('active')) {
            currentTab = $(this);
        }
    });

    //disable button next or prev if reaches first or last tab
    var _btnPrev = $('#btnPrev');
    var _btnNext = $('#btnNext');

    if (currentTab.index() == 0) {
        _btnPrev.prop('disabled', true);
        _btnNext.prop('disabled', false);
    } else if (currentTab.index() == (mTotalTabs - 1)) {
        _btnNext.prop('disabled', true);
        _btnPrev.prop('disabled', false);
    } else {
        _btnPrev.prop('disabled', false);
        _btnNext.prop('disabled', false);
    }
    //disable button next or prev if reaches first or last tab
}


/*--------------------end code 3------------------*/




/*--------------------start code 04------------------*/
//used to handle file upload inputs with preview button
function bindFileInputEvents(fileInputId, textInputId, spanId, viewButtonId) {
    $('#' + spanId).click(function () {
        $("#" + fileInputId).trigger('click');
    });

 

    $("#" + fileInputId).change(function () {
        $('#' + textInputId).val(this.value.replace(/C:\\fakepath\\/i, ''));
        $('#' + viewButtonId).prop('disabled', false); // Enable the view button when a file is selected
        $('#div' + fileInputId).css('box-shadow', '');
        $('#div' + fileInputId).prop('title', '');
    });

    $('.view-button').click(function () {
        var fileId = $(this).data('target');
        var fileInput = $("#" + fileId)[0];

        if (fileInput.files && fileInput.files[0]) {
            var file = fileInput.files[0];
            var fileURL = URL.createObjectURL(file);

            // Open a new window/tab with the file preview
            window.open(fileURL);
        }
    });
}

// Call the function for each pair of input elements
bindFileInputEvents('file_payslip1', 'text_payslip1', 'span_payslip1', 'view_payslip1');
bindFileInputEvents('file_payslip2', 'text_payslip2', 'span_payslip2', 'view_payslip2');
bindFileInputEvents('file_payslip3', 'text_payslip3', 'span_payslip3', 'view_payslip3');
bindFileInputEvents('file_sr', 'text_sr', 'span_sr', 'view_sr');
bindFileInputEvents('file_depedid', 'text_depedid', 'span_depedid', 'view_depedid');
bindFileInputEvents('file_prc', 'text_prc', 'span_prc', 'view_prc');
bindFileInputEvents('file_billing', 'text_billing', 'span_billing', 'view_billing');
bindFileInputEvents('file_gsis', 'text_gsis', 'span_gsis', 'view_gsis');
bindFileInputEvents('file_idpic', 'text_idpic', 'span_idpic', 'view_idpic');
// Add more pairs as needed
/*--------------------end code 04------------------*/




/*--------------------start code 05------------------*/
//this is to add row data to the table on the add family member modal


$('#btnAddFam').click(function (e) {
    var _mFamCount = $('#myFamily tbody tr').length;

    if (_mFamCount == 2) {
        e.stopPropagation();
        alert('Only a maximum of 2 family members are allowed.');
    } else {
        $('#addFamily').modal('show');
        InitializeFamilyModal('ADD', '');
      
      //call success function
    }

});

$(document).on('click', '.famedit', function () { //Beneficiary edit button
    InitializeFamilyModal('EDIT', this.name);
});



function InitializeFamilyModal(pMode, pFamID) {
   
  

    if (pMode.toUpperCase() == 'ADD') {
        mFamEditMode = 'ADD';


    } else if (pMode.toUpperCase() == 'EDIT') {
        mFamEditMode = 'EDIT';
        mFamEditID = pFamID;


        //console.log(mFamEditID); trigger once ie. fam_1

        clearFamilyDetails();

        $('#myFamily tbody tr').each(function () {
            _this = $(this);
            let _mFamID = _this.children('.famid').html();

            //console.log(mFamEditID); //(2) only one ie. fam_1 but trigger twice
            //console.log(_mFamID) // trigger all row ie. fam_1 fam_2

            if (_mFamID == mFamEditID) {
               // console.log(_this.children('.famprovince').html());
                $('#txtFamLastname').val(_this.children('.famlastname').html());
                $('#txtFamFirstname').val(_this.children('.famfirstname').html());
                $('#txtFamMiddlename').val(_this.children('.fammiddlename').html());
                $('#txtFamDob').val(_this.children('.famdob').html());
                $('#txtFamPob').val(_this.children('.fampob').html());
                $('#txtFamOccupation').val(_this.children('.famoccupation').html());
                $('#txtFamCompanyName').val(_this.children('.famcompany').html());
                $('#txtFamComContactNo').val(_this.children('.famcontactno').html());
                $('#street6').val(_this.children('.famstreet').html());
                $('#region6').val(_this.children('.famregion').html());
              //  $('#province6').val(_this.children('.famprovince').html());
               // $('#city6').val(_this.children('.famcity').html());
               $('#zipCode6').val(_this.children('.famzipcode').html());
               
                const $fregion = $('#region6');
                const $fprovince = $('#province6');
                const $fcity = $('#city6');
                const $fzipCodeInput = $('#zipCode6');

                const fselectedRegion = $fregion.val();
                console.log(fselectedRegion);
                if (fselectedRegion) {
                    populateDropdown($fprovince, address[fselectedRegion]);
                    $fprovince.prepend($('<option selected  value="' + _this.children('.famprovince').html() +'">'+ _this.children('.famprovince').html() +'</option>'));
                } else {
                    clearDropdowns($fprovince, $fcity, $fzipCodeInput);
                }

                const fselectedProvince = _this.children('.famprovince').html();
                    if (fselectedProvince) {
                        populateDropdown($fcity, address[fselectedRegion][fselectedProvince]);
                        $fcity.prepend($('<option selected  value="' + _this.children('.famcity').html() +'">' + _this.children('.famcity').html() +'</option>'));
                    } else {
                        clearDropdowns($fcity, $fzipCodeInput);
                    }


              
            


            }
        });

    }


}


function clearFamilyDetails() {
    _txtFamLastname = $('#txtFamLastname');
    _txtFamFirstname = $('#txtFamFirstname');
    _txtFamMiddlename = $('#txtFamMiddlename');
    _txtRegion = $('#region6');

    _txtFamLastname.val('');
    _txtFamFirstname.val('');
    _txtFamMiddlename.val('');
    _txtRegion.val('');

}
$('#btnFamSave').unbind("click").click(function (e) {
    if (mFamEditMode == 'ADD') {
        AddFamily();
    } else if (mFamEditMode == 'EDIT') {
        UpdateFamily();
    }
});


function AddFamily() {
    var boolSuccess = true;
    boolSuccess = ValidateFields('', '.famreq', '');

    if (boolSuccess) {
        var _mFamDetails = [];
       
        var LastName = $('#txtFamLastname').val();
        var FirstName = $('#txtFamFirstname').val();
        var MiddleName = $('#txtFamMiddlename').val();
        var DOB = $('#txtFamDob').val();
        var POB = $('#txtFamPob').val();
        var OCCUPATION = $('#txtFamOccupation').val();
        var COMPANY = $('#txtFamCompanyName').val();
        var CONTACT = $('#txtFamComContactNo').val();
        var COMPANYSTREET = $('#street6').val();
        var COMPANYREGION = $('#region6').val();
        var COMPANYPROVINCE = $('#province6').val();
        var COMPANYTOWN = $('#city6').val();
        var COMPANYZIP = $('#zipCode6').val();
        var RELATION = $('#txtrelationship').val();

        var FullName = LastName + ", " + FirstName + " " + MiddleName;
        var FullAddress = COMPANYSTREET + ", " + COMPANYREGION + " " + COMPANYPROVINCE + " " + COMPANYTOWN + " " + COMPANYZIP;


        _mFamDetails.push('<td class="famfullname" id="famfullname_' + _mNextFamCount + '">' + FullName + '</td>'); //1
        _mFamDetails.push('<td class="famdob" id="famdob_' + _mNextFamCount + '">' + DOB + '</td>'); //2
        _mFamDetails.push('<td class="fampob" id="fampob_' + _mNextFamCount + '">' + POB + '</td>'); //3
        _mFamDetails.push('<td class="famoccupation" id="famoccupation_' + _mNextFamCount + '">' + OCCUPATION + '</td>'); //4
        _mFamDetails.push('<td class="famcompany" id="famcompany_' + _mNextFamCount + '">' + COMPANY + '</td>'); //5
        _mFamDetails.push('<td class="famcontactno" id="famcontactno_' + _mNextFamCount + '">' + CONTACT + '</td>'); //6
        _mFamDetails.push('<td class="famcomaddress" id="famcomaddress_' + _mNextFamCount + '">' + FullAddress + '</td>'); //7
        _mFamDetails.push('<td class="famzipcode" id="famzipcode_' + _mNextFamCount + '">' + COMPANYZIP + '</td>'); //8
        _mFamDetails.push('<td class="famrelation" id="famrelation_' + _mNextFamCount + '">' + RELATION + '</td>'); //9
        _mFamDetails.push('<td><button class="btn btn-primary famedit" name="fam_' + _mNextFamCount + '" type="button" data-bs-toggle="modal" data-bs-target="#addFamily"><i class="fa fa-pencil"></i></button><button class="btn btn-danger delete"><i class="fa fa-trash"></i></button></td>'); //12
        _mFamDetails.push('<td class="famstreet d-none" id="famstreet_' + _mNextFamCount + '">' + COMPANYSTREET + '</td>'); //10
        _mFamDetails.push('<td class="famregion d-none" id="famregion_' + _mNextFamCount + '">' + COMPANYREGION + '</td>'); //11
        _mFamDetails.push('<td class="famprovince d-none" id="famprovince_' + _mNextFamCount + '">' + COMPANYPROVINCE + '</td>'); //12
        _mFamDetails.push('<td class="famcity d-none" id="famcity_' + _mNextFamCount + '">' + COMPANYTOWN + '</td>'); //13
        _mFamDetails.push('<td class="famlastname d-none" id="famlastname_' + _mNextFamCount + '">' + LastName + '</td>'); //14
        _mFamDetails.push('<td class="famfirstname d-none" id="famfirstname_' + _mNextFamCount + '">' + FirstName + '</td>'); //15
        _mFamDetails.push('<td class="fammiddlename d-none" id="fammiddlename_' + _mNextFamCount + '">' + MiddleName + '</td>'); //16
        _mFamDetails.push('<td class="famid d-none" id="famid_' + _mNextFamCount + '">' + 'fam_' + _mNextFamCount + '</td>'); //17 - Fam Temp ID

        _mNextFamCount++; //set = 0 if submitted
        var markup = '';

        for (i = 0; i < _mFamDetails.length; i++) {
            markup += _mFamDetails[i];
        }

        $('#myFamily tbody:last-child').append('<tr>' + markup + '</tr>');
        $("[data-bs-dismiss=modal]").trigger({ type: "click" });
      
    } else {
        alert('Please check the highlighted fields.');
    }
}

function UpdateFamily() {

    var boolSuccess = true;
    boolSuccess = ValidateFields('', '.famreq', '');

    if (boolSuccess) {

        var LastName = $('#txtFamLastname').val();
        var FirstName = $('#txtFamFirstname').val();
        var MiddleName = $('#txtFamMiddlename').val();
        var DOB = $('#txtFamDob').val();
        var POB = $('#txtFamPob').val();
        var OCCUPATION = $('#txtFamOccupation').val();
        var COMPANY = $('#txtFamCompanyName').val();
        var CONTACT = $('#txtFamComContactNo').val();
        var COMPANYSTREET = $('#street6').val();
        var COMPANYREGION = $('#region6').val();
        var COMPANYPROVINCE = $('#province6').val();
        var COMPANYTOWN = $('#city6').val();
        var COMPANYZIP = $('#zipCode6').val();
        var RELATION = $('#txtrelationship').val();

        var FullName = LastName + ", " + FirstName + " " + MiddleName;
        var FullAddress = COMPANYSTREET + ", " + COMPANYREGION + " " + COMPANYPROVINCE + " " + COMPANYTOWN + " " + COMPANYZIP;


        $('#myFamily tbody tr').each(function () {
            _this = $(this);
            let _mFamID = _this.children('.famid').html();

            if (_mFamID == mFamEditID) {
                _this.children('.famfullname').html(FullName);
                _this.children('.famlastname').html(LastName);
                _this.children('.famfirstname').html(FirstName);
                _this.children('.fammiddlename').html(MiddleName);
                _this.children('.famcomaddress').html(FullAddress);
                _this.children('.famdob').html(DOB);
                _this.children('.fampob').html(POB);
                _this.children('.famoccupation').html(OCCUPATION);
                _this.children('.famcompany').html(COMPANY);
                _this.children('.famcontactno').html(CONTACT);
                _this.children('.famstreet').html(COMPANYSTREET);
                _this.children('.famregion').html(COMPANYREGION);
                _this.children('.famprovince').html(COMPANYPROVINCE);
                _this.children('.famcity').html(COMPANYTOWN);
                _this.children('.famzipcode').html(COMPANYZIP);
                _this.children('.famrelation').html(RELATION);
            }
        });

        $("[data-bs-dismiss=modal]").trigger({ type: "click" });
    }
}
/*--------------------end code 05------------------*/
$(document).ready(function () {
    $("#txtCivStat").on("change", function () {
        var csselectedValue = $(this).val();
        if (csselectedValue === "S") {
            // Disable the text field
            $('#txtSpoLastname').prop('disabled', true).val('NA');
            $('#txtSpoFirstname').prop('disabled', true).val('NA');
            $('#txtSpoMiddlename').prop('disabled', true).val('NA');
            $('#txtSpoDob').prop('disabled', true).val('NA');
            $('#txtSpoPob').prop('disabled', true).val('NA');
            $('#txtSpoOccupation').prop('disabled', true).val('NA');
            $('#txtSpoCompany').prop('disabled', true).val('NA');
            $('#contact5').prop('disabled', true).val('NA');
            $('#street5').prop('disabled', true).val('NA');
            $('#region5').prop('disabled', true).val('NA').removeClass('spireq');
            $('#province5').prop('disabled', true).val('NA').removeClass('spireq');
            $('#city5').prop('disabled', true).val('NA').removeClass('spireq');
            $('#zipCode5').prop('disabled', true).val('NA');
        } else {
            // Enable the text field
            $('#txtSpoLastname').prop('disabled', false).val('');
            $('#txtSpoFirstname').prop('disabled', false).val('');
            $('#txtSpoMiddlename').prop('disabled', false).val('');
            $('#txtSpoDob').prop('disabled', false).val('');
            $('#txtSpoPob').prop('disabled', false).val('');
            $('#txtSpoOccupation').prop('disabled', false).val('');
            $('#txtSpoCompany').prop('disabled', false).val('');
            $('#contact5').prop('disabled', false).val('');
            $('#street5').prop('disabled', false).val('');
            $('#region5').prop('disabled', false).val('').addClass('spireq');
            $('#province5').prop('disabled', false).val('').addClass('spireq');
            $('#city5').prop('disabled', false).val('').addClass('spireq');
            $('#zipCode5').prop('disabled', false).val('');
        }
    });
});



/*--------------------start code 06------------------*/
//use for input field to format as currency




//automatically add .00 decimal and peso sign. */
$('.currency_input').on('blur', function () {
    // Remove dollar symbol and commas, and then parse as a float
    const value = parseFloat(this.value.replace(/[,$d]/g, ''));

    if (!isNaN(value)) {
        // Format the value with commas and add a dollar symbol
        this.value =  value.toLocaleString('en-US', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    } else {
        // Handle cases where the input is not a valid number (NaN)
        this.value = '';
    }
});
/*--------------------end code 06------------------*/



/*--------------------start code 07------------------*/
// codes used for multiple condition in dealing with number input field

// only accept numbers only
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isvalidmonth(data) {
    var valdata = data.value;
    var iddata = data.id.toLocaleString();
    if(valdata > 11){
        $('#' + iddata).val('');
       
    }
 }

// only accept numbers and slash only
function isNumberWithSlash(evt) {
    var input = String.fromCharCode(evt.which || evt.keyCode);

    // Use a regular expression to allow numbers (0-9) and the forward slash ('/')
    var regex = /^[0-9\/]*$/;

    if (!regex.test(input)) {
        return false;
    }
    return true;
}
//only accepts numbers and dots
function isNumberWithDot(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
        return false;
    }
    return true;

}

/*--------------------end code 07------------------*/


/*--------------------start code 08------------------*/
$(document).ready(function () {
    //validate email address to only accept deped email
    $("#email").on("input", function () {
        // Get the value of the email input field
        var emailInput = $("#email").val();

        // Define a regular expression pattern to match "deped.gov.ph" domain
        var pattern = /^[a-zA-Z0-9._-]+@deped\.gov\.ph$/;

        // Check if the email matches the pattern
        if (pattern.test(emailInput) || emailInput == "") {
            // Valid email address
            $("#error").text("");
        } else {
            // Invalid email address
            $("#error").text("Invalid email address. Please use a deped.gov.ph email.");
        }
    });
    /*
    $("#emailForm").submit(function (e) {
        e.preventDefault();

        // Perform final validation or submission here 
    });
    */
});

/*--------------------end code 08------------------*/




function validate(tabName) {
    var boolSuccess = true;
    var boolPayFieldValidation = true;
    var boolSPIValidation = true
    var boolSPIFileValidation = true;
    var boolFamiliyValidation = true;


    switch (tabName) {
        case "#nav-p1":
            boolPayFieldValidation = ValidateFields('', '.payreq', '');
           // boolPayRuleValidation = ValidateFieldRules('', '.payreq', '');

          //  if (boolPayFieldValidation && boolPayRuleValidation) {
            if (boolPayFieldValidation) {
                boolSuccess = true;
            } else {
                boolSuccess = false;
            }
            break;
        case "#nav-p2":
            boolSPIValidation = ValidateFields('', '.spireq', '');
            boolSPIFileValidation = ValidateFieldRules('', '.filerule', '')
            boolFamilyValidation = ValidateEncodedFamily();
            if (boolSPIValidation && boolSPIFileValidation ) {
                boolSuccess = true;
            } else {
                boolSuccess = false;
            }
            break;
    }
    return boolSuccess;
}

function ValidateEncodedFamily() {
    var boolSuccess = true;
    var _mFamCount = $('#myFamily tbody tr').length;
    var _eFamTableDiv = $('#myFamily').closest('div');

    if (_mFamCount == 0) {
        boolSuccess = false;
        _eFamTableDiv.css('box-shadow', requiredFieldErrorColor);
    } else {
        _eFamTableDiv.css('box-shadow', '');
        _eFamTableDiv.prop('title', '');
    }

    return boolSuccess;
}

function ValidateFieldRules(elementID, className, groupName) {
    var boolSuccess = true;

    $(className).each(function () {
        var _this = $(this);
        switch (className) {
            case '.filerule':
                const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'];
                const maxFileSize = 4 * 1024 * 1024; // 4MB in bytes
                if (_this.val()) {
                    const fileName = _this.val().toLowerCase();
                    const fileExtension = fileName.split('.').pop();
                    const fileSize = this.files[0].size;

                    if (!allowedExtensions.includes(fileExtension) || fileSize > maxFileSize) {
                        if (!allowedExtensions.includes(fileExtension)) {
                            alert('Invalid file type. Allowed file types are: .png, .jpg, .jpeg, .pdf, .doc, .docx');
                        } else if (fileSize > maxFileSize) {
                            alert('File size exceeds the maximum limit of 4MB.');
                        }

                        // Apply error styling
                        $('#div' + this.name).css('box-shadow', requiredFieldErrorColor);
                        $('#div' + this.name).prop('title', 'Invalid file.');
                        boolSuccess = false;
                    } else {
                        // File is valid, remove error styling
                        $('#div' + this.name).css('box-shadow', '');
                        $('#div' + this.name).prop('title', '');
                    }
                }

                break;
        };
    });
   
    return boolSuccess;
}


function ValidateFields(elementName, className, groupName) {
    var boolSuccess = true;
    var mOptionSelected = 0;

    $(className).each(function () {
        var _this = $(this);

        switch (this.tagName) {
            case 'INPUT':
                if (this.type == 'radio' || this.type == 'checkbox') { //checkbox and radio button
                    $('input[name=' + this.name + ']').each(function () {
                        if (this.checked) {
                            mOptionSelected++;

                            //start
                            if (this.value == 'OTH') {
                                if ($('#txtOth' + this.name).val().trim() === '') {
                                    $('#txtOth' + this.name).css('box-shadow', requiredFieldErrorColor);
                                    $('#txtOth' + this.name).prop('title', 'This is a Required field.');
                                    boolSuccess = false;
                                } else {
                                    $('#txtOth' + this.name).css('box-shadow', '');
                                    $('#txtOth' + this.name).prop('title', '');
                                }
                            } else if (this.value == 'Y') {
                                if ($('#myid1radioPAI').is(':checked') || $('#myid2radioPAI').is(':checked')) {
                                    $('#div' + this.name + 'amount').css('box-shadow', '');
                                    $('#div' + this.name + 'amount').prop('title', '');
                                } else {
                                    $('#div' + this.name + 'amount').css('box-shadow', requiredFieldErrorColor);
                                    $('#div' + this.name + 'amount').prop('title', 'This is a Required field.');
                                    boolSuccess = false;
                                }
                            } else if (this.value == 'N') {
                                $('#myid1radioPAI').prop('checked', false);
                                $('#myid2radioPAI').prop('checked', false);
                                $('#div' + this.name + 'amount').css('box-shadow', '');
                                $('#div' + this.name + 'amount').prop('title', '');
                            }

                            //end



                        }
                    });
                    if (mOptionSelected == 0) {
                        $('#div' + this.name).css('box-shadow', requiredFieldErrorColor);
                        $('#div' + this.name).prop('title', 'This is a Required field.');
                        boolSuccess = false;
                    } else {
                        $('#div' + this.name).css('box-shadow', '');
                        $('#div' + this.name).prop('title', '');
                        mOptionSelected = 0;
                    }


                }  else {  //textbox
                    if (_this.hasClass('payreq') || _this.hasClass('spireq') || _this.hasClass('famreq')) {
                        if (_this.val().trim() === '') {
                            _this.css('box-shadow', requiredFieldErrorColor);
                            _this.prop('title', 'This is a Required field.');
                            boolSuccess = false;
                        }
                        else {
                            _this.css('box-shadow', '');
                            _this.prop('title', '');
                        }
                    }
                   
                }
                break;
            case 'SELECT':
                if (_this.prop('selectedIndex') == -1 || (_this.prop('options')[_this.prop('selectedIndex')].disabled)) {
                    _this.css('box-shadow', requiredFieldErrorColor);
                    boolSuccess = false;
                } else {
                    _this.css('box-shadow', '');
                    _this.prop('title', '');
                }


                break;


        };

    });
    return boolSuccess;
}


$('#checkOthers').change(function () {
    if (this.checked) {
        $('#txtOthSourceOfFunds').prop('disabled', false).val('');
    }
    else {
        $('#txtOthSourceOfFunds').prop('disabled', true).val('');
    }
});




//remove family member 
$(document).on('click', '.delete', function () { //Family member delete button
    var parent = $(this).parent().parent();
    parent.remove();
});



























$('#checkPopulate').change(function () {
    if (this.checked) {
        $('#txtSchDivNo').prop('disabled', false).val('1234567');
        $('#txtSchStaNo').prop('disabled', false).val('ABC1234');
        $('#txtSchEmpNo').prop('disabled', false).val('NCR1234');
        $('#txtSchName').prop('disabled', false).val('BAGONG BUHAY ELEMENTARY SCHOOL');
 
        $('#txtLoanAmt').prop('disabled', false).val('100,000.00');
        $('#txtTerm').prop('disabled', false).prop('selectedIndex', 2).change();
        $('#txtLastname').prop('disabled', false).val('STARK');
        $('#txtFirstname').prop('disabled', false).val('IRONMAN');
        $('#txtMiddlename').prop('disabled', false).val('TONY');

        $('#txtDoB').prop('disabled', false).val('04-Oct-1991');
        $('#txtPoB').prop('disabled', false).val('STA CRUZ MANILA');
        $('#txtGender').prop('disabled', false).prop('selectedIndex', 1).change();
        $('#txtHeightFt').prop('disabled', false).val('6');
        $('#txtHeightIn').prop('disabled', false).val('2');
        $('#txtWeight').prop('disabled', false).val('59');
        $('#txtUnit').prop('disabled', false).prop('selectedIndex', 1).change();

        $('#email').prop('disabled', false).val('asdasd@deped.gov.ph');
        $('#txtNationality').prop('disabled', false).prop('selectedIndex', 1).change();
        $('#txtCivStat').prop('disabled', false).prop('selectedIndex', 1).change();
        $('#txtTinNo').prop('disabled', false).val('123123123');
        $('#checkSalary').prop('checked', true);
        $('#txtOccupation').prop('disabled', false).val('Superhero');
        $('#txtGrossPay').prop('disabled', false).val('100,000.00');
        $('#txtNetPay').prop('disabled', false).val('80,000.00');
        $('#txtCreditCardNo').prop('disabled', false).val('8172368112');
        $('#txtCreditCardLimit').prop('disabled', false).val('500,000.00'); 
        $('#date_hired').prop('disabled', false).val('04-Oct-2022'); 

        $('#street1').prop('disabled', false).val('KALAYAAN STREET BLOCK 1 LOT 17');
        $('#street2').prop('disabled', false).val('Block 28 Lot 32 BGY BAGONG UMAGA ');
        $('#street3').prop('disabled', false).val('ENGLISH STREET, GOLDENBOY SUBDIVISION ');
        $('#street4').prop('disabled', false).val('DECEMBER AVENUE, CORNER EDSA');
        $('#street5').prop('disabled', false).val('ALABANG STREET PAYATAS VILLAGE');

        $('#contact1').prop('disabled', false).val('23123123');
        $('#contact2').prop('disabled', false).val('53423423');
        $('#contact3').prop('disabled', false).val('34523422');
        $('#contact4').prop('disabled', false).val('56764533');
        $('#contact5').prop('disabled', false).val('74563453');

        $('#losy2').prop('disabled', false).val('10');
        $('#losm2').prop('disabled', false).val('5');
        $('#losy3').prop('disabled', false).val('2');
        $('#losm3').prop('disabled', false).val('4');
        $('#losy4').prop('disabled', false).val('6');
        $('#losm4').prop('disabled', false).val('3');
    

        $('#txtSpoLastname').prop('disabled', false).val('SWIFT');
        $('#txtSpoFirstname').prop('disabled', false).val('TAYLOR');
        $('#txtSpoMiddlename').prop('disabled', false).val('BATUMBAKAL');
        $('#txtSpoDob').prop('disabled', false).val('09-Oct-2023');
        $('#txtSpoPob').prop('disabled', false).val('MAKATI CITY');
        $('#txtSpoOccupation').prop('disabled', false).val('TEACHER');
        $('#txtSpoCompany').prop('disabled', false).val('MONKEY BUSINESS');
        $('#txtSpoPob').prop('disabled', false).val('6');
        $('#txtSpoOccupation').prop('disabled', false).val('3');


        $('#agree1').prop('checked', true);
        $('#agree2').prop('checked', true);
        $('#agree3').prop('checked', true);
  

        $('#checkOwned').prop('checked', true);
    
        $('#radioPaiNo').prop('checked', true);

        $('#txtBank').prop('disabled', false).val('Bank of America');
        $('#txtAccNo').prop('disabled', false).val('123123123123');
      
       
        // $('#ddlPermanentResiAdd2').prop('disabled', false).prop('selectedIndex', 0);
    }


});





$(document).ready(function () {
    $("#generatePdfButton").click(function () {
        // Create a new window/tab to open the PDF
        var pdfUrl = "?handler=Generate";
        window.open(pdfUrl, '_blank');
    });
});




$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        // Call your GetClientById function with the retrieved ID
        GetClients(id);
    } else {
        // Handle the case where the "id" parameter is not found or is invalid
        console.error('Invalid or missing ID parameter in the URL.');
    }
});
// Function to make the Ajax request
function GetClients(id) {
    $.ajax({
        url: '/?handler=Client&id=' + id,
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },

        success: function (response) {
            // Assuming response is an array of client objects
         

            console.log(response);

        },
        error: function () {
            alert('unable to read the data');
        }


    });
}
