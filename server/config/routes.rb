Rails.application.routes.draw do
  resources :users
  resources :quizzes, only: [:index, :show, :create, :edit, :update, :destroy] do
    resources :questions, only: [:index, :show, :create, :edit, :update, :destroy] do
      resources :answers, only: [:index, :show, :create, :edit, :update, :destroy]
    end
  end

  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'

  post '/create-quiz', to: 'quizzes#create_quiz'
  get '/quizzes/show_by_title/:title', to: 'quizzes#show_by_title'

 
  get '/quizzes/:id', to: 'quizzes#show_by_title'
end
