require 'pry'
require_relative 'csvMaker.rb'
require 'CSV'
require 'sinatra'


get("/"){
	erb :home
}

get("/savedata"){
	writeToFile(params["values"])
}

post("/savedata"){
	binding.pry
	writeToFile(params["values"])
}