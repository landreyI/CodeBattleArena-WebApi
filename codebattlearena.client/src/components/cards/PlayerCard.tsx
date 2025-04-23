import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Player, Role } from "@/models/dbModels";
interface Props {
    player: Player
    isAuth?: boolean
}
export function PlayerCard({ player, isAuth }: Props) {
    const getRoleColor = (role: string) => {
        switch (role) {
            case Role.Admin:
                return "bg-yellow-500 text-dark";
            case Role.Manager:
                return "bg-blue-500 text-dark";
            case Role.Banned:
                return "bg-red-500 text-dark";
            case Role.User:
            default:
                return "bg-green-500 text-dark";
        }
    };

  return (
      <Card className="bg-zinc-800 border-zinc-700 shadow-lg">
          <CardHeader className="flex flex-col items-center">
              <Avatar className="w-30 h-30 mb-4">
                  <AvatarImage src={player.photoUrl || undefined} alt={player.username} className="hover:scale-[1.3] transition"/>
                  <AvatarFallback className="bg-zinc-700 text-green-400 text-2xl">
                      {player.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-mono text-green-400">
                  {player.username}
              </CardTitle>

              <Badge className={getRoleColor(player.role)}>{player.role}</Badge>

          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isAuth && (
                      <div>
                          <p className="text-sm text-zinc-400 font-mono">Email:</p>
                          <p className="text-lg text-white">{player.email}</p>
                      </div>
                  )}
                  <div>
                      <p className="text-sm text-zinc-400 font-mono">Victories:</p>
                      <p className="text-lg text-green-400 font-bold">{player.victories}</p>
                  </div>
                  <div>
                      <p className="text-sm text-zinc-400 font-mono">Joined:</p>
                      <p className="text-lg text-white">
                          {new Date(player.createdAt).toLocaleDateString()}
                      </p>
                  </div>
                  {player.additionalInformation && (
                      <div>
                          <p className="text-sm text-zinc-400 font-mono">Bio:</p>
                          <p className="text-lg text-white">{player.additionalInformation}</p>
                      </div>
                  )}
              </div>
          </CardContent>
      </Card>
  );
}

export default PlayerCard;