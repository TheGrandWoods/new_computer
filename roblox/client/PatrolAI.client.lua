local PatrolAI = {}

function PatrolAI:Start(npc)
    local waypoints = npc.Waypoints:GetChildren()
    local current = 1

    while true do
        npc.Humanoid:MoveTo(waypoints[current].Position)
        npc.Humanoid.MoveToFinished:Wait()

        current += 1
        if current > #waypoints then current = 1 end

        task.wait(1)
    end
end

return PatrolAI
