#!/usr/bin/env ruby
require 'rubygems'
require 'buoy_data'
require 'rethinkdb'
include RethinkDB::Shortcuts
#require './util'
require 'json'

def fixnumify(obj)
    if obj.respond_to? :to_f
        # If we can cast it to a Fixnum, do it.
        obj.to_f

    elsif obj.is_a? Array
        # If it's an Array, use Enumerable#map to recursively call this method
        # on each item.
        obj.map {|item| fixnumify item }

    elsif obj.is_a? Hash
        # If it's a Hash, recursively call this method on each value.
        obj.merge( obj ) {|k, val| fixnumify val }

    else
        # If for some reason we run into something else, just return
        # it unmodified; alternatively you could throw an exception.
        obj

    end
end

stations = Array.new
stations = [46232, 46225, 46231, 46242, 46224, 46086]

loop do
    conn = r.connect(:host => 'localhost', :port => 28015).repl
    stations.each do |id|
        station = BuoyData::NoaaBuoy.new(id)
        report = station.get
        report['station_id'] = id
        report['timestamp'] = DateTime.now.strftime('%Q')
        report = fixnumify(report)
        report.delete("STEEPNESS")
        report.delete("WWD")
        report.delete("SwD")
        puts r.db("buoy").table("bar").insert(report, :durability => "hard", :return_vals => true, :upsert => false).run
    end
    conn.close()
    sleep 300
end
