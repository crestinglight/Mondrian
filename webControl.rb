require 'CSV'
require 'sinatra'
require 'pry'

get("/"){
	session["savedHash"] = saveStateHash
	binding.pry
	erb :home
}