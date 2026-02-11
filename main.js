//EXTERNAL JS USED - jQuery, moment.js

var $startDate = moment().startOf("year");
var $endDate = moment($startDate).add(14, "M").add(-1, "days");
var $totalDays = moment($endDate).diff($startDate, "days");
var $offsetDays = moment().diff(moment($startDate), "days");

function buildGantt() {
  
  // Define variables
  var day, monthRow, dayRow;
  
  // Define months & days
  var days = ["S", "M", "T", "W", "T", "F", "S"];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  // Build gantt
  var date = moment($startDate); // Set reference date to start of year
  
  for (var i = 0; i <= $totalDays; i++) {
    day = date.date();
    dayRow +=
      "<td data-day='" + i + "'>" + days[date.day()] + "<br>" + day + "</td>";
    if (day == 1) { // If first of the month
      monthStart = moment(date);
      monthStart.add(1, "M");
      monthStart.add(-1, "d");
      dayCount = monthStart.date();
      monthRow += "<th data-days='" + dayCount + "'  colspan='" + dayCount + "'>" + months[date.month()] + " (" + date.year() + ")</th>";
    }
    date.add(1, "d");

    $(".chartLayout").html("<tr>" + monthRow + "</tr>" + dayRow);
    $(".chartLayout th:even").addClass("odd");
    $(".chartLayout td:contains('S')").addClass("weekend");
    $(".chartLayout td[data-day='" + $offsetDays + "']").addClass("today");
  }
}

function addData() {
  
  // Data
  var results = [
    {
      name: "Bilbo Baggins",
      reason: "Sickness",
      startDate: "2017-07-03 00:00",
      endDate: "2017-07-07 00:00"
    },
    {
      name: "Gandalf",
      reason: "Approved Holiday",
      startDate: "2017-06-08 00:00",
      endDate: "2017-06-10 00:00"
    },
    {
      name: "Sauron",
      reason: "Approved Holiday",
      startDate: "2017-08-09 00:00",
      endDate: "2017-08-15 00:00"
    },
    {
      name: "Samwise Gamgee",
      reason: "Pending Holiday",
      startDate: "2017-08-10 00:00",
      endDate: "2017-08-25 00:00"
    },
    {
      name: "Frodo Baggins",
      reason: "Lateness",
      startDate: "2017-07-04 00:00",
      endDate: "2017-07-18 00:00"
    },
    {
      name: "Aragorn",
      reason: "Approved Holiday",
      startDate: "2017-07-19 00:00",
      endDate: "2017-07-25 00:00"
    },
    {
      name: "Arwen",
      reason: "Declined Holiday",
      startDate: "2017-07-26 00:00",
      endDate: "2017-07-29 00:00"
    },
    {
      name: "Gimli",
      reason: "Approved Other",
      startDate: "2017-08-01 00:00",
      endDate: "2017-08-10 00:00"
    },
    {
      name: "Legolas",
      reason: "Pending Other",
      startDate: "2017-08-15 00:00",
      endDate: "2017-08-21 00:00"
    },
    {
      name: "Gollum",
      reason: "Declined Other",
      startDate: "2017-07-28 00:00",
      endDate: "2017-08-04 00:00"
    },
    {
      name: "Boromir",
      reason: "Sickness",
      startDate: "2017-07-24 00:00",
      endDate: "2017-08-01 00:00"
    }
  ];
  
  var eventBars, barRows = "", nameRows;
  var pxhr = 26 / 26;

  // Add data
  for (var i = 0; i < results.length; i++) {
    var obj = results[i];
    absenceReason = obj.reason.replace(/\s+/g, "-").toLowerCase();
    nameRows += "<tr><td class='" + absenceReason + "'>" + obj.name + "</td></tr>";
    startDate = moment(obj.startDate);
    endDate = moment(obj.endDate);
    numberOfDays = parseInt(moment.duration(endDate.diff(startDate)).asHours() * pxhr);
    pxWidth = Math.max(5, numberOfDays);
    leftOffset = parseInt(moment.duration(startDate.diff($startDate)).asHours() * pxhr); 
    eventBars = "<div class='bar " + absenceReason + "' style='left:" + leftOffset + "px; width:" + pxWidth + "px;'></div>";
    barRows += "<div class='barRow'>" + eventBars + "</div>";
  }
  
  // Create the markup
  $(".fixedSide").html("<tbody>" + "<tr class='padding'><td></td></tr>" + nameRows + "</tbody>");
  $(".fixedSide tr:odd").addClass("odd");
  $(".chartData").html(barRows);
  $(".barRow:even").addClass("odd");
  
  // Scroll nicely into view
  $(".scrollArea").animate(
    { scrollLeft: Math.max(0, $offsetDays * 25 - 250) },
    400
  );
}

function calcHeight() {
  var ht = $(".fixedSide tr").length * 24 + 60;
  $(".chartLayout td").css({
    height: ht
  });
}

function filterAbsences() {
  $(".key li a").click(function() {
    var target = $(this).data("target");
    if (target === "show-all") {
      $(".barRow, .fixedSide td").show();
    } else {
      $(".barRow, .fixedSide td").hide();
      $(".barRow:has('.bar." + target + "'), .fixedSide td." + target).show();
    }
  });
}

$(function() {
  buildGantt();
  addData();
  calcHeight();
  filterAbsences();
});
