def writeToFile(stringy)
	File.open("paintingCSV.csv", "a") do |x|
		x.puts stringy + "\n"
		x.close
	end
end