// object for AT A GLANCE table
let statistics = {
    "Democrats": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Republicans": {
        NoOfReps: 0,
        votedWithParty: 0,
    },
    "Independents": {
        NoOfReps: 0,
        votedWithParty: 0,

    },
    "Total": {
        NoOfReps: data.results[0].num_results,
        votedWithParty: 0,
    },
}

// Write code to create and fill three variables; one for a list of Dem objects etc.
// update statistics object with the number of members in each party,
// ... e.g. for the key "Number of Democrats" replace the default value of zero with the length of the list of Democrat objects.

arrayOfMembers = data.results[0].members;

var totalVotesPerc = 0;
for (i = 0; i < arrayOfMembers.length; i++) {
    totalVotesPerc += arrayOfMembers[i].votes_with_party_pct
}

// members by party
statistics.Democrats.NoOfReps = numberOfMembers(arrayOfMembers, "D")
statistics.Republicans.NoOfReps = numberOfMembers(arrayOfMembers, "R")
statistics.Independents.NoOfReps = numberOfMembers(arrayOfMembers, "I")

function numberOfMembers(anyArray, letter) {
    var numberOfMembersByParty = 0;
    for (var i = 0; i < anyArray.length; i++) {
        var membersParty = anyArray[i].party;
        if (membersParty == letter) {
            numberOfMembersByParty++;
        }
    }
    return numberOfMembersByParty;
}

// avg % voted with party
statistics.Democrats.votedWithParty = (sumVotes(arrayOfMembers, "D") / statistics.Democrats.NoOfReps).toFixed(2);
statistics.Republicans.votedWithParty = (sumVotes(arrayOfMembers, "R") / statistics.Republicans.NoOfReps).toFixed(2);
if (sumVotes(arrayOfMembers, "I") !== 0) {
    statistics.Independents.votedWithParty = (sumVotes(arrayOfMembers, "I") / statistics.Independents.NoOfReps).toFixed(2)
} else {
    statistics.Independents.votedWithParty = 0;
}
statistics.Total.votedWithParty = (Number(totalVotesPerc / arrayOfMembers.length)).toFixed(2);

function sumVotes(anyArray, letter) {
    var allVotes = 0;
    for (var i = 0; i < anyArray.length; i++) {
        if (anyArray[i].party == letter) {
            allVotes += anyArray[i].votes_with_party_pct;
        }
    }
    return allVotes;
}

// move values to html table
function forHtmlTable(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (let keys in anyArray) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = [keys];
        cell2.innerHTML = anyArray[keys].NoOfReps;
        cell3.innerHTML = anyArray[keys].votedWithParty;
    }
}
forHtmlTable(statistics, "glanceTable");

// *********************************************************************************************************************

// declare array with ascending and descending missed votes pct
var sorterAsc = [];
var sorterDesc = [];

// ascending all pct over the complete members array
function mainArrayAsc(anyArray, criterion) {
    var perc = Math.round((anyArray.length * 0.1));
    anyArray.sort(function (a, b) {
        return a[criterion] - b[criterion];
    });
    sorterAsc = anyArray.slice(0, perc);

    for (var i = perc; i < anyArray.length; i++) {
        if (sorterAsc[perc - 1][criterion] == anyArray[i][criterion]) {
            sorterAsc.push(anyArray[i]);
        } else {
            break
        }
    }
}
if (document.URL.includes("attendance")) {
    mainArrayAsc(arrayOfMembers, "missed_votes_pct")
} else {
    mainArrayAsc(arrayOfMembers, "votes_with_party_pct")
}

// descending all pct over the complete members array
function mainArrayDesc(anyArray, criterion) {
    var perc = Math.round((anyArray.length * 0.1));
    anyArray.sort(function (a, b) {
        return b[criterion] - a[criterion]
    });
    sorterDesc = anyArray.slice(0, perc);

    for (var i = 0; i < anyArray.length; i++) {
        if (sorterDesc[perc - 1][criterion] == anyArray[i][criterion]) {
            sorterDesc.push(anyArray[i]);
        } else {
            break
        }
    }
}
console.log(sorterDesc);
for (var m = 0; m < sorterDesc.length; m++) {
    if (sorterDesc[sorterDesc.length - 1][criterion] === anyArray[m][criterion]) {
        sorterDesc = sorterDesc.push(anyArray[m])
    } else {
        break
    }
}
console.log(sorterDesc);
if (document.URL.includes("attendance")) {
    mainArrayDesc(arrayOfMembers, "missed_votes_pct")
} else {
    mainArrayDesc(arrayOfMembers, "votes_with_party_pct")
};

// move values to html tables
function forHtmlTable1(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (var k = 0; k < anyArray.length; k++) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        if (anyArray[k].middle_name == null) {
            anyArray[k].middle_name = "";
        }
        cell1.innerHTML = `${anyArray[k].first_name} ${anyArray[k].middle_name} ${anyArray[k].last_name}`;
        cell2.innerHTML = anyArray[k].missed_votes;
        cell3.innerHTML = anyArray[k].missed_votes_pct;
    }
}

function forHtmlTable2(anyArray, tbodyId) {
    var tbody = document.getElementById(tbodyId);
    for (var n = 0; n < anyArray.length; n++) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        if (anyArray[n].middle_name == null) {
            anyArray[n].middle_name = "";
        }
        cell1.innerHTML = `${anyArray[n].first_name} ${anyArray[n].middle_name} ${anyArray[n].last_name}`;
        cell2.innerHTML = anyArray[n].total_votes;
        cell3.innerHTML = anyArray[n].votes_with_party_pct;
    }
}
if (document.URL.includes("attendance")) {
    forHtmlTable1(sorterDesc, "least");
    forHtmlTable1(sorterAsc, "top");
} else {
    forHtmlTable2(sorterAsc, "leastloyalty");
    forHtmlTable2(sorterDesc, "toployalty");
}