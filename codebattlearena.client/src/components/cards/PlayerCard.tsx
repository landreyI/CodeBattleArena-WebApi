import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Player, Role } from "@/models/dbModels";
import { BookOpenText, Calendar, Mail, Trophy } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { getRoleColor } from "@/untils/helpers";
interface Props {
    player: Player
    isEdit?: boolean
}
export function PlayerCard({ player, isEdit }: Props) {
    const [showFullBio, setShowFullBio] = useState<boolean>();

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

              {player.role && (
                  <Badge className={getRoleColor(player.role)}>{player.role}</Badge>
              )}


          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isEdit && player.email) && (
                      <div>
                          <div className="flex items-center gap-2 text-zinc-400">
                              <Mail size={16} />
                              <p className="text-sm text-zinc-400 font-mono">Email:</p>
                          </div>
                          <div>
                              <p className="text-lg text-white">{player.email}</p>
                          </div>
                      </div>
                  )}
                  <div>
                      <div className="flex items-center gap-2 text-zinc-400">
                          <Trophy size={16} />
                          <p className="text-sm text-zinc-400 font-mono">Victories:</p>
                      </div>
                      <p className="text-lg text-green-400 font-bold">{player.victories}</p>
                  </div>
                  <div>
                      <div className="flex items-center gap-2 text-zinc-400">
                          <Calendar size={16} />
                          <p className="text-sm text-zinc-400 font-mono">Joined:</p>
                      </div>
                      <p className="text-lg text-white">
                          {new Date(player.createdAt).toLocaleDateString()}
                      </p>
                  </div>
              </div>
              {player.additionalInformation && (
                  <div>
                      <div className="flex items-center gap-2 text-zinc-400 mb-1">
                          <BookOpenText size={16} />
                          <p className="text-sm font-mono">Bio:</p>
                      </div>
                      <p
                          onClick={() => setShowFullBio(prev => !prev)}
                          className={clsx(
                              "text-lg text-white cursor-pointer transition-all duration-300",
                              showFullBio ? "line-clamp-none max-h-[1000px]" : "line-clamp-2 max-h-[3.6em] overflow-hidden"
                          )}
                          title="Click to expand"
                      >
                          {player.additionalInformation}
                      </p>
                  </div>
              )}
          </CardContent>
      </Card>
  );
}

export default PlayerCard;