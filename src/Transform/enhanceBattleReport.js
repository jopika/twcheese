import { ImageSrc } from '/twcheese/conf/ImageSrc.js';
import { escapeHtml } from '/twcheese/src/Util/UI.js';
import { gameUrl } from '/twcheese/src/Util/Network.js';

/**
 * @param {HTMLDocument} gameDoc 
 * @param {BattleReport} report 
 */
function enhanceBattleReport(gameDoc, report) {

    var reportTable = gameDoc.getElementById('attack_luck').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    /*==== surviving defenders ====*/
    if (gameDoc.getElementById('attack_info_def_units')) {
        var defenseUnitsTable = gameDoc.getElementById('attack_info_def_units');
        let rowAbove = defenseUnitsTable.rows[defenseUnitsTable.rows.length - 1];
        let survivorsRow = defenseUnitsTable.insertRow(-1);
        survivorsRow.className = "center";
        survivorsRow.insertCell(-1);
        survivorsRow.cells[0].innerHTML = 'Survivors:';
        survivorsRow.cells[0].align = 'left';
        
        for (let unitType of window.game_data.units) {
            if (survivorsRow.cells.length >= rowAbove.cells.length) {
                break;
            }
            let cell = survivorsRow.insertCell(-1);
            let unitCount = report.defenderSurvivors[unitType];
            if (unitCount === 0) {
                cell.className = 'hidden';
            }
            cell.innerHTML = unitCount;
        }
    }

    /*==== surviving attackers ====*/
    if (gameDoc.getElementById('attack_info_att_units')) {
        var unit_table = gameDoc.getElementById('attack_info_att_units');
        let rowAbove = unit_table.rows[unit_table.rows.length - 1];
        let survivorsRow = unit_table.insertRow(-1);
        survivorsRow.className = "center";
        survivorsRow.insertCell(-1);
        survivorsRow.cells[0].innerHTML = 'Survivors:';
        survivorsRow.cells[0].align = 'left';

        for (let unitType of window.game_data.units) {
            if (survivorsRow.cells.length >= rowAbove.cells.length) {
                break;
            }
            let cell = survivorsRow.insertCell(-1);
            let unitCount = report.attackerSurvivors[unitType];
            if (unitCount === 0) {
                cell.className = 'hidden';
            }
            cell.innerHTML = unitCount;
        }
    }

    /*==== population summary ====*/
    if (report.espionageLevel >= 2) {
        let population = report.calcPopulation();
        let idleLabel = (report.espionageLevel === 3) ? 'Idle' : 'Unknown';

        $(gameDoc).find('#attack_spy_buildings_right')
            .after(`
                <table>
                    <tr>
                        <th>Population:</th>
                        <td>
                            Buildings <b>(${population.buildings})</b>
                            <br/>Military <b>(${population.troops})</b>
                            <br/>${idleLabel} <b>(${population.idle})</b>
                        </td>
                    </tr>
                </table>
            `);
    }

    /*==== loyalty ====*/
    if (report.loyalty) {
        var resultsHeaders = gameDoc.getElementById('attack_results').getElementsByTagName('th');
        var loyaltyRow = textScraper.first(resultsHeaders, 'report.loyalty').parentNode;
        var loyaltyHTML = loyaltyRow.cells[1].innerHTML;
        loyaltyRow.removeChild(loyaltyRow.cells[1]);
        loyaltyRow.insertCell(-1);
        loyaltyRow.cells[1].innerHTML = loyaltyHTML;
        loyaltyRow.cells[1].innerHTML += '<br/><span title="the current predicted loyalty, based on time passed since this report">@Current Time: ' + report.loyaltyExtra.loyaltyNow + '</span>';
        loyaltyRow.cells[1].innerHTML += '<br/><span title="the predicted loyalty at time of arrival, should you send a nobleman from your current village right now">@Arrival: ' + report.loyaltyExtra.loyaltyAtArrival + '</span>';
    }

    /*==== opponents defeated ====*/
    var oddRow = gameDoc.getElementById('attack_info_att').insertRow(-1);
    var oddHeader = document.createElement('th');
    oddHeader.innerHTML = 'ODD:';
    oddRow.appendChild(oddHeader);
    oddRow.insertCell(-1);
    oddRow.cells[1].innerHTML = `The defender gained ${report.killScores.defender} points.`;

    var odaRow = gameDoc.getElementById('attack_info_def').insertRow(-1);
    var odaHeader = document.createElement('th');
    odaHeader.innerHTML = 'ODA:';
    odaRow.appendChild(odaHeader);
    odaRow.insertCell(-1);
    if (report.killScores.attacker === null) {
        odaRow.cells[1].innerHTML = 'Not enough information.'
    } else {
        odaRow.cells[1].innerHTML = `The attacker gained ${report.killScores.attacker} points.`;
    }

    /*==== timing info ====*/
    if (!reportTable.rows) //6.5 graphics
        reportTable = reportTable.getElementsByTagName('table')[1];
    var launchRow = reportTable.insertRow(2);

    launchRow.insertCell(-1);
    launchRow.cells[0].innerHTML = '<span title="the time the attacker sent the attack">Launched</span>';
    launchRow.insertCell(-1);
    launchRow.cells[1].innerHTML = report.timingInfo.launchTime.toHtml();

    /*==== determine whether return time should be displayed. ====*/
    let showReturnTime = !report.attackerSurvivors.isZero();

    var returnRow = reportTable.insertRow(3);
    returnRow.insertCell(-1);
    if (showReturnTime) {
        returnRow.cells[0].innerHTML = '<span title="the time the attacking troops return to the attacker\'s village">Returns</span>';
        returnRow.insertCell(-1);
        returnRow.cells[1].innerHTML = report.timingInfo.returnTime.toHtml();
    }

    /*==== rally point Manage Troops link ====*/
    let isDefenderMe = report.defender.name == game_data.player.name;
    let wasVillageConquered = report.loyalty && report.loyalty.after <= 0;
    if (isDefenderMe || wasVillageConquered) {
        let url = gameUrl('place', {mode:'units', village:report.defenderVillage.id});
        let linkHtml = `<a href="${url}" style="float: right;">
            <img title="manage troops" style="float:right; cursor:pointer;" src="${ImageSrc.buildingIcon('place')}" />
        </a>`;
        let defenderVillageCell = gameDoc.getElementById('attack_info_def').rows[1].cells[1];
        defenderVillageCell.appendChild($(linkHtml)[0]);
    }

    /*==== json representation ====*/
    var jsonRow = reportTable.insertRow(5);
    jsonRow.insertCell(-1);
    jsonRow.cells[0].colSpan = 2;
    jsonRow.cells[0].innerHTML = '<b>JSON</b><br/><textarea cols=50 readonly=true>' + escapeHtml(JSON.stringify(report, null, 2)) + '</textarea>';
}


export { enhanceBattleReport };