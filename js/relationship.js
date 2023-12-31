﻿let relationshipdata = [
    { 'Rel': 'ADOPTED DAUGHTER' },
    { 'Rel': 'ADOPTED SON' },
    { 'Rel': 'ASSIGNEE BANKER' },
    { 'Rel': 'AUNT' },
    { 'Rel': 'BANKER' },
    { 'Rel': 'BODYGUARD' },
    { 'Rel': 'BROTHER' },
    { 'Rel': 'BROTHER-IN-LAW' },
    { 'Rel': 'BUSINESS PARTNER' },
    { 'Rel': 'COMMON LAW HUSBAND' },
    { 'Rel': 'COMMON LAW WIFE' },
    { 'Rel': 'CO-OWNER' },
    { 'Rel': 'COUSIN' },
    { 'Rel': 'CO-WORKER/CO-EMPLOYEE' },
    { 'Rel': 'CREDITOR' },
    { 'Rel': 'DAUGHTER' },
    { 'Rel': 'DAUGHTER-IN-LAW' },
    { 'Rel': 'DRIVER' },
    { 'Rel': 'EMPLOYER' },
    { 'Rel': 'ESTATE' },
    { 'Rel': 'EXECUTIVE ASSISTANT' },
    { 'Rel': 'FATHER' },
    { 'Rel': 'FATHER-IN-LAW' },
    { 'Rel': 'FIANCEE' },
    { 'Rel': 'FRIEND' },
    { 'Rel': 'GODCHILD' },
    { 'Rel': 'GODMOTHER' },
    { 'Rel': 'GRAND NIECE' },
    { 'Rel': 'GRAND NEPHEW' },
    { 'Rel': 'GRANDDAUGHTER' },
    { 'Rel': 'GRANDFATHER' },
    { 'Rel': 'GRANDMOTHER' },
    { 'Rel': 'GRANDSON' },
    { 'Rel': 'GREAT AUNT/GRAND AUNT' },
    { 'Rel': 'GREAT GRANDDAUGHTER' },
    { 'Rel': 'GREAT GRANDFATHER' },
    { 'Rel': 'GREAT GRANDMOTHER' },
    { 'Rel': 'GREAT GRANDNEPHEW' },
    { 'Rel': 'GREAT GRANDNIECE' },
    { 'Rel': 'GREAT GRANDSON' },
    { 'Rel': 'GREAT UNCLE/GRAND UNCLE' },
    { 'Rel': 'GUARDIAN' },
    { 'Rel': 'HOUSEMAID' },
    { 'Rel': 'HUSBAND' },
    { 'Rel': 'KEYMAN INSURANCE' },
    { 'Rel': 'LIVE-IN PARTNER' },
    { 'Rel': 'MOTHER' },
    { 'Rel': 'MOTHER-IN-LAW' },
    { 'Rel': 'NANNY' },
    { 'Rel': 'NEIGHBOR' },
    { 'Rel': 'NEPHEW' },
    { 'Rel': 'NIECE' },
    { 'Rel': 'PERSONAL ASSISTANT/SECRETARY' },
    { 'Rel': 'PERSONAL DOCTOR' },
    { 'Rel': 'PROFESSOR' },
    { 'Rel': 'SCHOOLMATE' },
    { 'Rel': 'SECURITY GUARD' },
    { 'Rel': 'SERVANT' },
    { 'Rel': 'SISTER' },
    { 'Rel': 'SISTER-IN-LAW' },
    { 'Rel': 'SON' },
    { 'Rel': 'SON-IN-LAW' },
    { 'Rel': 'STAFF' },
    { 'Rel': 'STEP BROTHER' },
    { 'Rel': 'STEP DAUGHTER' },
    { 'Rel': 'STEP FATHER' },
    { 'Rel': 'STEP MOTHER' },
    { 'Rel': 'STEP SISTER' },
    { 'Rel': 'STEP SON' },
    { 'Rel': 'TUTOR' },
    { 'Rel': 'UNCLE' },
    { 'Rel': 'WARD' },
    { 'Rel': 'WIFE' },
];

function populateRelDropdown(e) {
    $(e).empty();

    relationshipdata.forEach(function (v) {
        //$('#' + eid).append($('<option></option>').val(e.Rel).text(e.Rel));
        e.append($('<option></option>').val(v.Rel).text(v.Rel));
    });
}
