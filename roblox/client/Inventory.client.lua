local InventoryService = {}

function InventoryService:GetInventory(player)
    return player:FindFirstChild("Inventory")
end

function InventoryService:AddItem(player, itemName, amount)
    local inv = self:GetInventory(player)
    inv[itemName].Value += amount
end

function InventoryService:RemoveItem(player, itemName, amount)
    local inv = self:GetInventory(player)
    inv[itemName].Value = math.max(inv[itemName].Value - amount, 0)
end

return InventoryService
