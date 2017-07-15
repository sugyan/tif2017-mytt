Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'root#index'
  get '/result', to: redirect('/')
  get '/result/:key', to: 'root#result'

  namespace :api do
    get  'timetable', constraints: { format: :json }
    post 'generate'
    post 'tweet'
  end
end
