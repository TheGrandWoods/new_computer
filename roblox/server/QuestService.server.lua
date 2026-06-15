local QuestService = {}

local quests = {
    ColorsOfFreedom = {
        Stages = {
            {
                Description = "Talk to Luna.",
                Condition = function(player)
                    return player.Flags.MetLuna.Value == true
                end
            },
            {
                Description = "Bring Luna 1 Dream Ink.",
                Condition = function(player)
                    return player.Inventory.DreamInk.Value >= 1
                end,
                OnComplete = function(player)
                    player.Inventory.DreamInk.Value -= 1
                    player.Reputation.Artists.Value += 5
                end
            },
            {
                Description = "Help paint the mural.",
                Condition = function(player)
                    return player.Flags.MuralPainted.Value == true
                end
            }
        }
    }
}

function QuestService:CheckProgress(player, questName)
    local quest = quests[questName]
    local stage = player.Quests[questName].Stage.Value

    if quest.Stages[stage].Condition(player) then
        if quest.Stages[stage].OnComplete then
            quest.Stages[stage].OnComplete(player)
        end
        player.Quests[questName].Stage.Value += 1
    end
end

return QuestService
