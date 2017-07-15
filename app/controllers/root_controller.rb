class RootController < ApplicationController
  def index; end

  def result
    @result = Result.find_by(key: params[:key])
    render :index
  end
end
