  Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 is the default number.
  Given the list of events has been loaded 
  When a user does not enter or select a specific number of events to be shown
  Then thirty-two will be the number of events displayed

  Scenario: User can change the number of events they want to see.
  Given the list of events has been loaded
  When a user enters or selects a specific number of events to be shown
  Then the specific number of events will be displayed
