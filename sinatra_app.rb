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
    render_partial :menu
  end

  get '/single_player' do
    @board = session[:board] = Board.new
    @observer = session[:observer] = BrowserObserver.new
    @board.add_observer session[:observer]

    render_partial :ttt_game
  end

  get '/remote_create' do
    render_partial :remote_create
  end

  get '/remote_join' do
    render_partial :remote_join
  end

  post '/remote_game' do
    @name = params[:user_name]
    @board = session[:board] = Board.new
    @observer = session[:observer] = BrowserObserver.new
    @board.add_observer session[:observer]
    @flash_message = "Waiting for player to join..."

    render_partial :remote_game
  end

  get '/board' do
    @board = session[:board]

    render_partial :board
  end

  post '/try_move' do
    content_type :json
    @board = session[:board]
    @observer = session[:observer]
    @board.try_move params[:character], params[:position]
    { valid: @observer.valid, failureMessage: @observer.failure_message }.to_json
  end

  private
  def render_partial(partial)
    @content = partial
    erb :layout
  end
end
