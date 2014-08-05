class StocksController < ApplicationController
	respond_to :json 

	def index 
		respond_with Stock.all 
	end 

	def create 
		respond_with Stock.create(stock_params)
	end 

	def update 
		respond_with Stock.find(params[:id]).update_attributes(stock_params)

	def destroy 
		respond_with Stock.destroy(params[:id])
	end 

	private 
	def stock_params 
		params.require(:stock).permit(:id, :symbol, :name, :bid, :ask, :year_low, :year_high)
	end 
end 