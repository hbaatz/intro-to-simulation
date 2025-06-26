uniform vec3 color;
uniform float alpha;

void main() {
    gl_FragColor=vec4(clamp(color * 1.1, 0.0, 1.0), alpha);
}