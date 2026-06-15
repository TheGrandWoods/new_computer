local EconomyService = {}

local basePrices = {
    Glowleaf = 20,
    DreamInk = 40,
    EchoChip = 60,
    WhisperSeeds = 15
}

function EconomyService:GetPrice(itemName)
    local price = basePrices[itemName]
    -- dynamic modifiers
    if game.ReplicatedStorage.Events.PolicePressure.Value == "High" then
        if itemName == "EchoChip" then
            price *= 1.25
        end
    end
    return math.floor(price)
end

return EconomyService
