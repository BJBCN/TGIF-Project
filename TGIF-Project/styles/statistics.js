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

var arrayOfMembers = data.results[0].members; // declare variable and access in js.file that contains all members

// members by party
statistics.Democrats.NoOfReps = numberOfMembers(arrayOfMembers, "D")
statistics.Republicans.NoOfReps = numberOfMembers(arrayOfMembers, "R")
statistics.Independents.NoOfReps = numberOfMembers(arrayOfMembers, "I")

function numberOfMembers(anyArray, letter) {
    var numberOfMembersByParty = 0;
    for (var i = 0; i < anyArray.length; i++) {
        var membersParty = anyArray[i].party;
        if (membersParty == letter) {
            numberOfMembersByParty++; // creating 3 different groups
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
statistics.Total.votedWithParty = ((Number(statistics.Democrats.votedWithParty) + Number(statistics.Republicans.votedWithParty) + Number(statistics.Independents.votedWithParty)) / 3).toFixed(2);

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
    for (var i = 0; i < anyArray.length; i++) {
        sorterAsc.push(anyArray[i])
    };
    sorterAsc.sort(function (a, b) {
        return b[criterion] - a[criterion];
    });
    sorterAsc = sorterAsc.slice(0, Math.round((anyArray.length * 0.1)));
};
if (document.URL.includes("attendance")) {
    mainArrayAsc(arrayOfMembers, "missed_votes_pct")
} else {
    mainArrayAsc(arrayOfMembers, "votes_with_party_pct")
}

// descending all pct over the complete members array
function mainArrayDesc(anyArray, criterion) {
    for (var i = 0; i < anyArray.length; i++) {
        sorterDesc.push(anyArray[i]);
    };
    sorterDesc.sort(function (a, b) {
        return a[criterion] - b[criterion];
    });
    sorterDesc = sorterDesc.slice(0, Math.round((anyArray.length * 0.1)));
};
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
        // cell2.innerHTML = anyArray[k][crt1];
        cell2.innerHTML = anyArray[k].missed_votes;
        cell3.innerHTML = anyArray[k].missed_votes_pct;
    }
}

function forHtmlTable2(anyArray, tbodyId) {
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
        cell2.innerHTML = anyArray[k].total_votes;
        cell3.innerHTML = anyArray[k].votes_with_party_pct;
        // cell3.innerHTML = anyArray[k][crt2];
    }
}
if (document.URL.includes("attendance")) {
    // forHtmlTable1((sorterAsc, "least"), missed_votes);
    forHtmlTable1(sorterAsc, "least");
    forHtmlTable1(sorterDesc, "top");
} else {
    forHtmlTable2(sorterDesc, "leastloyalty");
    forHtmlTable2(sorterAsc, "toployalty");
}