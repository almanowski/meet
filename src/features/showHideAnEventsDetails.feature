  Feature: Show/Hide an Event’s Details

  Scenario: An event element is collapsed by default.
  Given the list of events has been loaded 
  When a user doesn't click on an event element
  Then the event element will be collapsed by default
  And hide event details

  Scenario: User can expand an event to see its details.
  Given the list of events has been loaded
  When a user clicks on an element
  Then the event element will expand 
  And show event details

  Scenario: User can collapse an event to hide its details.
  Given the event element has been clicked 
  And is expanded
  When a user clicks on the event element again or clicks a specific button
  Then the event element will collapse 
  And will hide the event details