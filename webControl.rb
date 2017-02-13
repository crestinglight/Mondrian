require 'CSV'
require 'sinatra'
require 'pry'

get("/"){
	erb :home
}