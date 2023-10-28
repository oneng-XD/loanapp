let regiondata = [
    { 'relv': 'NCR','Rel': 'NCR (National Capital Region)' },
    { 'relv': 'Region I','Rel': 'Region I (Ilocos Region)' },
    { 'relv': 'Region II','Rel': 'Region II (Cagayan Valley)' },
    { 'relv': 'Region III','Rel': 'Region III (Central Luzon)' },
    { 'relv': 'Region IV-A','Rel': 'Region IV-A (CALABARZON)' },
    { 'relv': 'Region IV-B','Rel': 'Region IV-B (MIMAROPA)' },
    { 'relv': 'Region V', 'Rel': 'Region V (Bicol Region)Region VI (Western Visayas)' },
    { 'relv': 'Region VI', 'Rel': 'Region VI (Western Visayas)' },
    { 'relv': 'Region VII','Rel': 'Region VII (Central Visayas)' },
    { 'relv': 'Region VIII','Rel': 'Region VIII (Eastern Visayas)' },
    { 'relv': 'Region IX','Rel': 'Region IX (Zamboanga Peninsula)' },
    { 'relv': 'Region X','Rel': 'Region X (Northern Mindanao)' },
    { 'relv': 'Region XI','Rel': 'Region 11 (Davao Region)' },
    { 'relv': 'Region XII','Rel': 'Region 12 (SOCCSKSARGEN)' },
    { 'relv': 'Region XIII','Rel': 'Region 13 (Caraga Region)' },
    { 'relv': 'CAR','Rel': 'CAR (Cordillera Administrative Region)' },
    { 'relv': 'BARMM"','Rel': 'Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)' },
];            

function populateRegionDropdown(e) {
    $(e).empty();
    e.append($('<option></option>').val('').text('Select Region'));
    relationshipdata.forEach(function (v) {
        //$('#' + eid).append($('<option></option>').val(e.Rel).text(e.Rel));
        e.append($('<option></option>').val(v.relv).text(v.Rel));
    });
}
