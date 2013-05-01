require 'sinatra'
$: << File.expand_path(File.dirname(__FILE__) + "/lib")

require 'tic_tac_toe_ai'
require 'browser_observer'
require 'json'

class SinatraApp < Sinatra::Base
  set :views, "./views"
  enable :raise_errors, :sessions
  disable :show_exceptions

  get '/' do
    redirect to '/menu'
  end

  get '/menu' do
    @content = :menu
    erb :layout
  end

  get '/single_player' do
    @board = session[:board] = Board.new
    @observer = session[:observer] = BrowserObserver.new
    @board.add_observer session[:observer]

    @content = :ttt_game
    erb :layout
  end

  get '/multiplayer_menu' do
    @content = :multiplayer_menu
    erb :layout
  end

  post '/multiplayer_game' do
    @name = params[:user_name]
    @board = session[:board] = Board.new
    @observer = session[:observer] = BrowserObserver.new
    @board.add_observer session[:observer]
    @flash_message = "Waiting for player to join..."

    @content = :multiplayer_game
    erb :layout
  end

  get '/board' do
    @board = session[:board]

    @content = :board
    erb :layout
  end

  post '/try_move' do
    content_type :json
    @board = session[:board]
    @observer = session[:observer]
    @board.try_move params[:character], params[:position]
    { valid: @observer.valid, failureMessage: @observer.failure_message }.to_json
  end
end
