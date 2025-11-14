'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, ExternalLink } from 'lucide-react';

// Types
interface Resume {
  id: string;
  title: string;
  uploadDate: string;
  fileUrl: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
}

interface Link {
  id: string;
  platform: string;
  url: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

export default function ProfilePage() {
  // Mock Data & State
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      title: 'Full Stack Developer Resume',
      uploadDate: '2024-01-15',
      fileUrl: '#',
    },
    {
      id: '2',
      title: 'Senior Software Engineer Resume',
      uploadDate: '2024-02-20',
      fileUrl: '#',
    },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Leading a team of 5 developers building cloud-native applications',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      description: 'Built scalable web applications using React and Node.js',
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      url: 'https://github.com/example/ecommerce',
    },
    {
      id: '2',
      name: 'AI Chat Application',
      description: 'Real-time chat application with AI-powered responses',
      technologies: ['Next.js', 'OpenAI', 'WebSocket', 'PostgreSQL'],
      url: 'https://github.com/example/ai-chat',
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    { id: '1', platform: 'GitHub', url: 'https://github.com/johndoe' },
    { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { id: '3', platform: 'Portfolio', url: 'https://johndoe.com' },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Expert' },
    { id: '3', name: 'React', level: 'Expert' },
    { id: '4', name: 'Node.js', level: 'Advanced' },
    { id: '5', name: 'Python', level: 'Intermediate' },
  ]);

  // Form States
  const [newResume, setNewResume] = useState({ title: '', uploadDate: '', fileUrl: '' });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    url: '',
  });
  const [newLink, setNewLink] = useState({ platform: '', url: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

  // Add Functions
  const addResume = () => {
    if (newResume.title && newResume.uploadDate) {
      setResumes([
        ...resumes,
        { ...newResume, id: Date.now().toString(), fileUrl: newResume.fileUrl || '#' },
      ]);
      setNewResume({ title: '', uploadDate: '', fileUrl: '' });
    }
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setExperiences([...experiences, { ...newExperience, id: Date.now().toString() }]);
      setNewExperience({ company: '', position: '', startDate: '', endDate: '', description: '' });
    }
  };

  const addProject = () => {
    if (newProject.name && newProject.description) {
      setProjects([
        ...projects,
        {
          ...newProject,
          id: Date.now().toString(),
          technologies: newProject.technologies.split(',').map((t) => t.trim()),
        },
      ]);
      setNewProject({ name: '', description: '', technologies: '', url: '' });
    }
  };

  const addLink = () => {
    if (newLink.platform && newLink.url) {
      setLinks([...links, { ...newLink, id: Date.now().toString() }]);
      setNewLink({ platform: '', url: '' });
    }
  };

  const addSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { ...newSkill, id: Date.now().toString() }]);
      setNewSkill({ name: '', level: 'Beginner' });
    }
  };

  // Delete Functions
  const deleteResume = (id: string) => setResumes(resumes.filter((r) => r.id !== id));
  const deleteExperience = (id: string) => setExperiences(experiences.filter((e) => e.id !== id));
  const deleteProject = (id: string) => setProjects(projects.filter((p) => p.id !== id));
  const deleteLink = (id: string) => setLinks(links.filter((l) => l.id !== id));
  const deleteSkill = (id: string) => setSkills(skills.filter((s) => s.id !== id));

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your professional information
          </p>
        </div>

        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="links">External Links</TabsTrigger>
            <TabsTrigger value="skills">Skill Sets</TabsTrigger>
          </TabsList>

          {/* Resume Tab */}
          <TabsContent value="resume">
            <Card>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Your Resumes
              </h2>

              {/* Add Resume Form */}
              <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <h3 className="mb-4 font-medium text-gray-900">Add New Resume</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Resume Title"
                    value={newResume.title}
                    onChange={(e) => setNewResume({ ...newResume, title: e.target.value })}
                  />
                  <Input
                    type="date"
                    value={newResume.uploadDate}
                    onChange={(e) => setNewResume({ ...newResume, uploadDate: e.target.value })}
                  />
                  <Button onClick={addResume} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" /> Add Resume
                  </Button>
                </div>
              </div>

              {/* Resume List */}
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {resume.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Uploaded: {resume.uploadDate}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteResume(resume.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Work Experience
              </h2>

              {/* Add Experience Form */}
              <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <h3 className="mb-4 font-medium text-gray-900">
                  Add New Experience
                </h3>
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      placeholder="Company Name"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, company: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Position"
                      value={newExperience.position}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, position: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      type="month"
                      placeholder="Start Date"
                      value={newExperience.startDate}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, startDate: e.target.value })
                      }
                    />
                    <Input
                      type="month"
                      placeholder="End Date"
                      value={newExperience.endDate}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, endDate: e.target.value })
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, description: e.target.value })
                    }
                    rows={3}
                  />
                  <Button onClick={addExperience} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" /> Add Experience
                  </Button>
                </div>
              </div>

              {/* Experience List */}
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {exp.position}
                        </h4>
                        <p className="text-sm text-gray-700">{exp.company}</p>
                        <p className="mt-1 text-xs text-gray-600">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="mt-2 text-sm text-gray-700">
                          {exp.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Projects
              </h2>

              {/* Add Project Form */}
              <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <h3 className="mb-4 font-medium text-gray-900">Add New Project</h3>
                <div className="grid gap-4">
                  <Input
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                  <Textarea
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                    rows={3}
                  />
                  <Input
                    placeholder="Technologies (comma-separated)"
                    value={newProject.technologies}
                    onChange={(e) =>
                      setNewProject({ ...newProject, technologies: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Project URL"
                    value={newProject.url}
                    onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  />
                  <Button onClick={addProject} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" /> Add Project
                  </Button>
                </div>
              </div>

              {/* Projects List */}
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900">
                        {project.name}
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mb-3 text-sm text-gray-700">
                      {project.description}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* External Links Tab */}
          <TabsContent value="links">
            <Card>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                External Links
              </h2>

              {/* Add Link Form */}
              <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <h3 className="mb-4 font-medium text-gray-900">Add New Link</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Platform (e.g., GitHub)"
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  />
                  <Input
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  />
                  <Button onClick={addLink} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" /> Add Link
                  </Button>
                </div>
              </div>

              {/* Links List */}
              <div className="grid gap-3 md:grid-cols-2">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {link.platform}
                      </h4>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.url}
                      </a>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteLink(link.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Skill Sets
              </h2>

              {/* Add Skill Form */}
              <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
                <h3 className="mb-4 font-medium text-gray-900">Add New Skill</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    placeholder="Skill Name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  />
                  <Select
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    options={[
                      { value: 'Beginner', label: 'Beginner' },
                      { value: 'Intermediate', label: 'Intermediate' },
                      { value: 'Advanced', label: 'Advanced' },
                      { value: 'Expert', label: 'Expert' }
                    ]}
                    placeholder="Select skill level"
                  />
                  <Button onClick={addSkill} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" /> Add Skill
                  </Button>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid gap-3 md:grid-cols-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {skill.level}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
