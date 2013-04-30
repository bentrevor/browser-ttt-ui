require 'capybara/cucumber'
require_relative '../../sinatra_app'
Capybara.app = SinatraApp

Given /^a user visits the menu page$/ do
  visit '/menu'
end

When /^he tries to place an "(.*?)" at position "(.*?)"$/ do |char, pos|
  within("div#space#{pos}") do
    button = (char == 'x') ? 'button:first-of-type' : 'button:last-of-type'
    find(button).click
    sleep 0.5
  end
end

When /^he clicks on "(.*?)"$/ do |link|
  click_link link
end

When /^he clicks the "(.*?)" button$/ do |button|
  click_button button
end

When /^he enters "(.*?)" for his name$/ do |name|
  fill_in "name", with: name
end

Then /^he should see the menu$/ do
  within("#menu") do
    page.body.should have_link("Start New Single Player Game", href: "single_player")
    page.body.should have_link("Start New Multiplayer Game", href: "multiplayer_menu")
  end
end

Then /^he should see a unique secret code for the game$/ do
  find('#secret_code').text().should =~ /./
end

Then /^he should see an empty board$/ do
  page.body.should have_selector('div.space-character')
  (0..8).each do |index|
    within("div#space#{index}") do
      find('div.space-character').should have_content('.')
    end
  end
end

Then /^he should see (?:a|an) "(.*?)" in position "(.*?)"$/ do |char, pos|
  within("div#space#{pos}") do
    regex = /^#{Regexp.escape char}/
    find('div.space-character').text().should =~ regex
  end
end

Then /^he should see the flash message "(.*?)"$/ do |message|
  find('div#failure_message').text.should == message
end
