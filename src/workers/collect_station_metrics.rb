#!/usr/bin/env ruby
require 'rubygems'
require 'buoy_data'
require 'rethinkdb'
include RethinkDB::Shortcuts
require './util'
require 'json'

stations = Array.new
stations = [46232, 46225, 46231, 46242, 46224, 46086]

loop do
    conn = r.connect(:host => 'localhost', :port => 28015).repl
    stations.each do |id|
        station = BuoyData::NoaaBuoy.new(id)
        report = station.get
        report['station_id'] = id
        report['timestamp'] = DateTime.now.strftime('%Q')
        report = fixnumify report
        report.delete("STEEPNESS")
        report.delete("WWD")
        report.delete("SwD")
        puts r.db("buoy").table("bar").insert(report, :durability => "hard", :return_vals => true, :upsert => false).run
    end
    conn.close()
    sleep 300
end
