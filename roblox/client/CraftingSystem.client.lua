local CraftingService = {}

local recipes = {
    DreamInk = {
        Glowleaf = 2,
        WhisperSeeds = 1
    },
    EchoChip = {
        DreamInk = 1,
        WhisperSeeds = 2
    }
}

function CraftingService:CanCraft(player, recipeName)
    local inv = player.Inventory
    for item, amount in pairs(recipes[recipeName]) do
        if inv[item].Value < amount then
            return false
        end
    end
    return true
end

function CraftingService:Craft(player, recipeName)
    if not self:CanCraft(player, recipeName) then return false end

    local inv = player.Inventory
    for item, amount in pairs(recipes[recipeName]) do
        inv[item].Value -= amount
    end

    inv[recipeName].Value += 1
    return true
end

return CraftingService
