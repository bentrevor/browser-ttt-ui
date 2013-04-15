require 'capybara/cucumber'
require_relative '../../sinatra_app'
Capybara.app = SinatraApp

Given /^we haven't started a game yet$/ do
end

When /^we visit the home page$/ do
  visit '/'
end

Then /^we should see an empty board$/ do
  page.body.should have_selector('div.space-character')
  (0..8).each do |index|
    within("div#space#{index}") do
      find('div.space-character').should have_content('.')
    end
  end
end

When /^we try to place an "(.*?)" at position "(.*?)"$/ do |char, pos|
  within("div#space#{pos}") do
    button = (char == 'x') ? 'button:first-of-type' : 'button:last-of-type'
    find(button).click
    sleep 0.5
  end
end

Then /^we should see (?:a|an) "(.*?)" in position "(.*?)"$/ do |char, pos|
  within("div#space#{pos}") do
    regex = (char == 'x') ? /^x/ : /^o/
    regex = /^\./ if char == '.'
    find('div.space-character').text().should =~ regex
  end
end

Then /^we should see the flash message "(.*?)"$/ do |message|
  find('div#failure_message').text.should == message
end
