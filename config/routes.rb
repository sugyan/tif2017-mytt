Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'root#index'
  get '/result', to: redirect('/')

  namespace :api do
    get  'timetable', constraints: { format: :json }
    post 'generate'
  end
end
