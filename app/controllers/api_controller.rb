class ApiController < ApplicationController
  def timetable
    @data = Rails.cache.read('main') || []
  end
end
