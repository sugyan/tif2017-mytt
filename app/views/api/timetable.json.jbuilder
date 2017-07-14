json.array! @data do |item|
  json.start  item[:start].to_i
  json.end    item[:end].to_i
  json.stage  item[:stage]
  json.artist item[:artist]
  json.detail item[:detail]
end
