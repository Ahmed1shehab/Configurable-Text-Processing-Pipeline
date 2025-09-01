import { Mail, Phone, Globe, Linkedin, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function ContactCard() {
  const photoUrl = "/me.jpg"; 
  const linkedinUrl = "https://www.linkedin.com/in/ahmed-shehab-6767652b3/";
  const githubUrl = "https://github.com/Ahmed1shehab";
  const email = "ahmed.shehab.7355@gmail.com"; 
  const phoneNumber = "+20 155 042 7589"; 

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="flex flex-col items-center p-6">
        {/* Your Photo */}
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={photoUrl} alt="Ahmed Shehab" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">Ahmed Shehab</CardTitle>
        <p className="text-sm text-gray-500">Full-Stack Developer</p>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Contact Links */}
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-gray-500" />
          <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-blue-600 hover:underline">
            {phoneNumber}
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Linkedin className="w-5 h-5 text-sky-900" />
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            LinkedIn Profile
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-sky-900" />
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Portfolio
          </a>
        </div>
      </CardContent>
    </Card>
  );
}